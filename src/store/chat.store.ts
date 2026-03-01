import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Conversation, Message } from '../types/chat.types';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchQuery: string;
  createConversation: (modelAlias: string, provider: string) => string;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  pinConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, patch: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  clearConversation: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveConversation: (id: string | null) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    immer((set) => ({
      conversations: [],
      activeConversationId: null,
      searchQuery: '',

      createConversation: (modelAlias, provider) => {
        const id = crypto.randomUUID();
        const newConv: Conversation = {
          id,
          title: 'New Conversation',
          messages: [],
          model: modelAlias,
          provider,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        set((state) => {
          state.conversations.unshift(newConv);
          state.activeConversationId = id;
        });
        return id;
      },

      setActiveConversation: (id) => set((state) => {
        state.activeConversationId = id;
      }),

      deleteConversation: (id) => set((state) => {
        state.conversations = state.conversations.filter(c => c.id !== id);
        if (state.activeConversationId === id) {
          state.activeConversationId = state.conversations.length > 0 ? state.conversations[0].id : null;
        }
      }),

      renameConversation: (id, title) => set((state) => {
        const conv = state.conversations.find(c => c.id === id);
        if (conv) {
          conv.title = title;
          conv.updatedAt = Date.now();
        }
      }),

      pinConversation: (id) => set((state) => {
        const conv = state.conversations.find(c => c.id === id);
        if (conv) conv.isPinned = !conv.isPinned;
      }),

      addMessage: (convId, message) => set((state) => {
        const conv = state.conversations.find(c => c.id === convId);
        if (conv) {
          conv.messages.push(message);
          conv.updatedAt = Date.now();
        }
      }),

      updateMessage: (convId, msgId, patch) => set((state) => {
        const conv = state.conversations.find(c => c.id === convId);
        if (conv) {
          const msg = conv.messages.find(m => m.id === msgId);
          if (msg) Object.assign(msg, patch);
        }
      }),

      deleteMessage: (convId, msgId) => set((state) => {
        const conv = state.conversations.find(c => c.id === convId);
        if (conv) conv.messages = conv.messages.filter(m => m.id !== msgId);
      }),

      clearConversation: (id) => set((state) => {
        const conv = state.conversations.find(c => c.id === id);
        if (conv) conv.messages = [];
      }),

      setSearchQuery: (query) => set((state) => {
        state.searchQuery = query;
      })
    })),
    {
      name: 'llmate-chat-storage',
    }
  )
);
