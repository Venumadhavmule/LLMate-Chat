export type ProviderKey = 'openai' | 'anthropic' | 'ollama' | 'groq' | 'google' | 'nvidia';
export type ModelCapability = 'CHAT' | 'STREAM' | 'VISION' | 'TOOLS' | 'JSON' | 'EMBEDDINGS' | 'REASONING';

export interface ModelConfig {
  id: string;
  provider: ProviderKey;
  displayName: string;
  alias: string;
  description: string;
  contextWindow: number;
  capabilities: ModelCapability[];
  badge?: string;
  isLocal?: boolean;
  isFree?: boolean;
  isPremium?: boolean;
  providerColor: string;
  icon: string;
}

export interface ModelParameters {
  temperature: number;    // 0.0 – 2.0, default 0.7
  maxTokens: number;      // 100 – 8192, default 1000
  systemPrompt: string;   // Pre-pended as system message
  stream: boolean;        // Toggle streaming on/off
}
