import { useState } from 'react';
import { useChatStore, useModelStore, useUIStore } from '../store';
import { chatApi } from '../api/chat.api';
import type { ChatRequestDto } from '../types/api.types';
import type { Message } from '../types/chat.types';

export function useChat() {
  const {
    activeConversationId,
    addMessage,
    updateMessage,
    createConversation,
    conversations,
    renameConversation
  } = useChatStore();

  const { selectedModel, parameters } = useModelStore();
  const {
    setGenerating,
    setAbortController,
    clearAttachments,
    pendingAttachments
  } = useUIStore();

  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userText: string) => {
    setError(null);
    let convId = activeConversationId;

    if (!convId) {
      convId = createConversation(selectedModel.alias, selectedModel.provider);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      conversationId: convId,
      role: 'user',
      content: userText,
      status: 'complete',
      attachments: pendingAttachments.length > 0 ? [...pendingAttachments] : undefined,
      createdAt: Date.now()
    };

    addMessage(convId, userMessage);
    clearAttachments();

    const conv = conversations.find(c => c.id === convId);
    if (!conv || conv.messages.length <= 1) {
      const words = userText.split(' ').slice(0, 6).join(' ');
      renameConversation(convId, words + (userText.split(' ').length > 6 ? '...' : ''));
    }

    const assistantMsgId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantMsgId,
      conversationId: convId,
      role: 'assistant',
      content: '',
      status: 'sending',
      model: selectedModel.alias,
      provider: selectedModel.provider,
      createdAt: Date.now()
    };

    addMessage(convId, assistantMessage);

    const messagesHistory = (conv?.messages || []).concat(userMessage).map(m => ({
      role: m.role as string,
      content: m.content
    }));

    // Fetch freshest parameters to avoid React closure race-conditions from WelcomeScreen rapid clicks
    const currentParams = useModelStore.getState().parameters;

    if (currentParams.systemPrompt) {
      messagesHistory.unshift({ role: 'system', content: currentParams.systemPrompt });
    }

    const req: ChatRequestDto = {
      model: selectedModel.alias,
      provider: selectedModel.provider !== 'openai' ? selectedModel.provider : undefined,
      messages: messagesHistory,
      temperature: currentParams.temperature,
      maxTokens: currentParams.maxTokens,
    };

    const abortCtrl = new AbortController();
    setAbortController(abortCtrl);
    setGenerating(true);

    const startTime = Date.now();

    try {
      if (parameters.stream) {
        updateMessage(convId, assistantMsgId, { status: 'streaming' });

        let accumulatedText = '';
        await chatApi.chatStream(
          req,
          (delta) => {
            accumulatedText += delta;
            updateMessage(convId, assistantMsgId, { content: accumulatedText });
          },
          abortCtrl.signal
        );

        updateMessage(convId, assistantMsgId, {
          status: 'complete',
          latencyMs: Date.now() - startTime
        });
      } else {
        const res = await chatApi.chatBlocking(req);
        updateMessage(convId, assistantMsgId, {
          content: res.choices?.[0]?.content || '',
          status: 'complete',
          latencyMs: Date.now() - startTime,
          usage: res.usage
        });
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) {
        updateMessage(convId, assistantMsgId, {
          status: 'complete',
          latencyMs: Date.now() - startTime
        });
      } else {
        console.error('Chat error:', err);
        const errMsg = err.error || err.message || 'Unknown error occurred';
        setError(errMsg);
        updateMessage(convId, assistantMsgId, {
          status: 'error',
          error: errMsg,
          content: 'I encountered an error while trying to process your request.'
        });
      }
    } finally {
      setGenerating(false);
      setAbortController(null);
    }
  };

  return { sendMessage, error };
}
