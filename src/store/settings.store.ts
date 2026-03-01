import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings, SavedPrompt } from '../types/settings.types';
import { suggestedPrompts } from '../config/prompts.config';

interface SettingsState extends UserSettings {
  setUserName: (name: string) => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  setApiBaseUrl: (url: string) => void;
  addSavedPrompt: (prompt: SavedPrompt) => void;
  removeSavedPrompt: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      userName: 'Jackson',
      theme: 'dark',
      fontSize: 'md',
      apiBaseUrl: 'http://localhost:8080',
      savedPrompts: suggestedPrompts,
      language: 'en-US',
      voiceId: '',
      enableSounds: true,
      enableAnimations: true,

      setUserName: (name) => set({ userName: name }),
      setTheme: (theme) => set({ theme }),
      setApiBaseUrl: (url) => set({ apiBaseUrl: url }),
      addSavedPrompt: (prompt) => set((state) => ({ savedPrompts: [...state.savedPrompts, prompt] })),
      removeSavedPrompt: (id) => set((state) => ({ savedPrompts: state.savedPrompts.filter(p => p.id !== id) })),
    }),
    {
      name: 'llmate-settings-storage',
    }
  )
);
