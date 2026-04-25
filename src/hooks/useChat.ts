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
      // Clear template ID so it doesn't stick permanently to the parameters
      useModelStore.getState().setActiveTemplateId(null);

      if (parameters.stream) {
        updateMessage(convId, assistantMsgId, { status: 'streaming' });

        let accumulatedText = '';
        let currentProvider = req.provider || 'auto';
        let currentModel = req.model;

        await chatApi.chatStream(
          req,
          (chunk) => {
            if (chunk.delta) {
              accumulatedText += chunk.delta;
            }
            
            const metadata: any = {};
            if (chunk.provider) currentProvider = chunk.provider;
            if (chunk.model) currentModel = chunk.model;
            
            if (chunk.providerOptions?.fallback_notice) {
              metadata.fallbackNotice = chunk.providerOptions.fallback_notice;
            }

            updateMessage(convId, assistantMsgId, { 
              content: accumulatedText,
              provider: currentProvider,
              model: currentModel,
              ...metadata
            });
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
        console.error('[useChat] Error occurred:', err);
        let errMsg = err.error || err.message || 'Unknown error occurred';
        
        // Specifically detect network/CORS issues
        if (errMsg === 'Failed to fetch') {
          errMsg = 'Network Error: Could not connect to the backend server. Please check if the server is running and CORS is allowed.';
        }
        
        setError(errMsg);
        updateMessage(convId, assistantMsgId, {
          status: 'error',
          error: errMsg,
          content: 'I encountered an error while trying to process your request. Check console logs for details.'
        });
      }
    } finally {
      setGenerating(false);
      setAbortController(null);
    }
  };

  return { sendMessage, error };
}
