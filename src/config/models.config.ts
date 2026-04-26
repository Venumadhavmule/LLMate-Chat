import type { ModelConfig } from '../types/model.types';

const allModelsConfig: ModelConfig[] = [
  // OpenAI Flagship
  {
    id: 'openai-gpt-4o',
    provider: 'openai',
    displayName: 'GPT-4o',
    alias: 'openai/gpt-4o',
    description: 'Flagship high-intelligence model for complex tasks and vision',
    contextWindow: 128000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS', 'JSON'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-gpt-4o-mini',
    provider: 'openai',
    displayName: 'GPT-4o Mini',
    alias: 'fast',
    description: 'Fast, efficient model for lightweight daily tasks',
    contextWindow: 128000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS', 'JSON'],
    badge: 'FAST ⚡',
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-o1',
    provider: 'openai',
    displayName: 'OpenAI o1',
    alias: 'openai/o1',
    description: 'Advanced reasoning model for complex logic and math',
    contextWindow: 128000,
    capabilities: ['CHAT', 'REASONING'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-o1-mini',
    provider: 'openai',
    displayName: 'o1-mini',
    alias: 'openai/o1-mini',
    description: 'Faster reasoning model specialized for coding',
    contextWindow: 128000,
    capabilities: ['CHAT', 'REASONING'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },

  // Anthropic Flagship
  {
    id: 'anthropic-claude-3-5-sonnet',
    provider: 'anthropic',
    displayName: 'Claude 3.5 Sonnet',
    alias: 'smart',
    description: 'Highest intelligence with breakthrough coding capabilities',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    badge: 'SMART ✨',
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },
  {
    id: 'anthropic-claude-3-5-haiku',
    provider: 'anthropic',
    displayName: 'Claude 3.5 Haiku',
    alias: 'haiku',
    description: 'Fastest Claude model for sub-second responses',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    badge: 'FAST ⚡',
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },
  {
    id: 'anthropic-claude-3-opus',
    provider: 'anthropic',
    displayName: 'Claude 3 Opus',
    alias: 'opus',
    description: 'Deep reasoning and creative writing specialist',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },

  // Google Gemini
  {
    id: 'google-gemini-1-5-pro',
    provider: 'google',
    displayName: 'Gemini 1.5 Pro',
    alias: 'google/gemini-1.5-pro',
    description: 'Massive 2M context window for long-document analysis',
    contextWindow: 2000000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    providerColor: '#4285F4',
    icon: 'SiGoogle'
  },
  {
    id: 'google-gemini-2-0-flash',
    provider: 'google',
    displayName: 'Gemini 2.0 Flash',
    alias: 'google/gemini-2.0-flash',
    description: 'Next-gen multimodal speed and intelligence',
    contextWindow: 1000000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    badge: 'NEW ✨',
    providerColor: '#4285F4',
    icon: 'SiGoogle'
  },
  {
    id: 'google-gemini-2-5-flash-lite',
    provider: 'google',
    displayName: 'Gemini 2.5 Lite',
    alias: 'google/gemini-2.5-flash-lite',
    description: 'Ultra-lightweight multimodal model',
    contextWindow: 1000000,
    capabilities: ['CHAT', 'STREAM', 'VISION'],
    providerColor: '#4285F4',
    icon: 'SiGoogle'
  },

  // Local / Open Models (Ollama)
  {
    id: 'ollama-llama-3-2-3b',
    provider: 'ollama',
    displayName: 'Llama 3.2 (3B)',
    alias: 'local',
    description: 'Fast local Llama 3.2 model for privacy',
    contextWindow: 8192,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiMeta'
  },
  {
    id: 'ollama-mistral-nemo',
    provider: 'ollama',
    displayName: 'Mistral Nemo',
    alias: 'mistral',
    description: 'Powerful 12B model by Mistral and NVIDIA',
    contextWindow: 128000,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiOllama'
  },
  {
    id: 'ollama-codestral',
    provider: 'ollama',
    displayName: 'Codestral',
    alias: 'code',
    description: 'State-of-the-art local model for code generation',
    contextWindow: 32000,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'LuCode'
  },

  // Specialized / Experimental
  {
    id: 'groq-llama-3-1-70b',
    provider: 'groq',
    displayName: 'Groq Llama 3.1',
    alias: 'groq/llama-3.1-70b',
    description: 'Llama 3.1 powered by Groq LPUs for extreme speed',
    contextWindow: 131072,
    capabilities: ['CHAT', 'STREAM'],
    badge: 'FAST ⚡',
    providerColor: '#F97316',
    icon: 'SiMeta'
  },
  {
    id: 'nvidia-nemotron-70b',
    provider: 'nvidia',
    displayName: 'Nemotron 70B',
    alias: 'nvidia/nemotron-70b',
    description: 'Reward-model optimized Llama variant by NVIDIA',
    contextWindow: 131072,
    capabilities: ['CHAT', 'STREAM'],
    providerColor: '#76B900',
    icon: 'SiNvidia'
  }
];

// Helper to filter models based on the developer .env sandbox string
const enabledProvidersEnv = import.meta.env.VITE_ENABLED_PROVIDERS;

export const modelsConfig = enabledProvidersEnv
  ? allModelsConfig.filter(model => enabledProvidersEnv.includes(model.provider))
  : allModelsConfig;

