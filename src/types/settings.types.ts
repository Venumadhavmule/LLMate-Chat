export interface SavedPrompt {
  id: string;
  title: string;
  content: string;
}

export interface UserSettings {
  userName: string;
  theme: 'dark' | 'light' | 'system';
  fontSize: 'sm' | 'md' | 'lg';
  apiBaseUrl: string;
  savedPrompts: SavedPrompt[];
  language: string;
  voiceId: string;
  enableSounds: boolean;
  enableAnimations: boolean;
}
