import { useChatStore } from '../store';
import type { Conversation } from '../types/chat.types';

export function useConversation() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    pinConversation,
    clearConversation
  } = useChatStore();

  const getActiveConversation = (): Conversation | undefined => {
    return conversations.find(c => c.id === activeConversationId);
  };

  const getFilteredConversations = (query: string): Conversation[] => {
    if (!query) return conversations;
    return conversations.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.messages.some(m => m.content.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return {
    conversations,
    activeConversation: getActiveConversation(),
    activeConversationId,
    setActiveConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    pinConversation,
    clearConversation,
    getFilteredConversations
  };
}
