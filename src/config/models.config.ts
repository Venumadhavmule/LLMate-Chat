import type { ModelConfig } from '../types/model.types';

const allModelsConfig: ModelConfig[] = [
  {
    id: 'openai-gpt-4o',
    provider: 'openai',
    displayName: 'GPT',
    alias: 'openai/gpt-4o',
    description: 'High-intelligence flagship model for complex tasks',
    contextWindow: 128000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS', 'JSON'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-gpt-4o-mini',
    provider: 'openai',
    displayName: 'GPT',
    alias: 'fast',
    description: 'Affordable and intelligent small model for fast, lightweight tasks',
    contextWindow: 128000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS', 'JSON'],
    badge: 'FAST ⚡',
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-gpt-4-turbo',
    provider: 'openai',
    displayName: 'GPT',
    alias: 'openai/gpt-4-turbo',
    description: 'Previous generation high-intelligence model',
    contextWindow: 128000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-o1',
    provider: 'openai',
    displayName: 'o1',
    alias: 'openai/o1',
    description: 'Reasoning model for hard problems',
    contextWindow: 200000,
    capabilities: ['CHAT', 'REASONING'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-o1-mini',
    provider: 'openai',
    displayName: 'o1',
    alias: 'openai/o1-mini',
    description: 'Faster reasoning model for coding and math',
    contextWindow: 200000,
    capabilities: ['CHAT', 'REASONING'],
    providerColor: '#10A37F',
    icon: 'SiOpenai'
  },
  {
    id: 'openai-text-emb-3-small',
    provider: 'openai',
    displayName: 'Embedding',
    alias: 'embed',
    description: 'Highly efficient embedding model',
    contextWindow: 8191,
    capabilities: ['EMBEDDINGS'],
    providerColor: '#10A37F',
    icon: 'LuLayers'
  },

  // Anthropic
  {
    id: 'anthropic-claude-3-5-sonnet',
    provider: 'anthropic',
    displayName: 'Claude',
    alias: 'smart',
    description: 'Most intelligent Claude model',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },
  {
    id: 'anthropic-claude-3-5-haiku',
    provider: 'anthropic',
    displayName: 'Claude',
    alias: 'haiku',
    description: 'Fastest Claude model for daily tasks',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    badge: 'FAST ⚡',
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },
  {
    id: 'anthropic-claude-3-opus',
    provider: 'anthropic',
    displayName: 'Claude',
    alias: 'opus',
    description: 'Powerful model for highly complex tasks',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM', 'VISION', 'TOOLS'],
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },
  {
    id: 'anthropic-claude-3-haiku',
    provider: 'anthropic',
    displayName: 'Claude',
    alias: 'anthropic/claude-3-haiku',
    description: 'Previous generation fast Claude model',
    contextWindow: 200000,
    capabilities: ['CHAT', 'STREAM'],
    providerColor: '#D97706',
    icon: 'SiAnthropic'
  },

  // Ollama
  {
    id: 'ollama-llama3-2',
    provider: 'ollama',
    displayName: 'Llama',
    alias: 'local',
    description: 'Meta\'s latest local model',
    contextWindow: 8192,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiMeta'
  },
  {
    id: 'ollama-llama3-2-7b',
    provider: 'ollama',
    displayName: 'Llama',
    alias: 'ollama/llama3.2:7b',
    description: 'Meta Llama 3.2 7B',
    contextWindow: 8192,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiMeta'
  },
  {
    id: 'ollama-mistral',
    provider: 'ollama',
    displayName: 'Mistral',
    alias: 'mistral',
    description: 'Efficient and powerful 7B model',
    contextWindow: 32000,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiOllama'
  },
  {
    id: 'ollama-phi3',
    provider: 'ollama',
    displayName: 'Phi',
    alias: 'phi',
    description: 'Microsoft\'s lightweight model',
    contextWindow: 4096,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiOllama'
  },
  {
    id: 'ollama-gemma2',
    provider: 'ollama',
    displayName: 'Gemma',
    alias: 'ollama/gemma2',
    description: 'Google\'s open model',
    contextWindow: 8192,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'SiGoogle'
  },
  {
    id: 'ollama-codellama',
    provider: 'ollama',
    displayName: 'Code Llama',
    alias: 'code',
    description: 'Inference model specialized for code',
    contextWindow: 16384,
    capabilities: ['CHAT', 'STREAM'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'LuCode'
  },
  {
    id: 'ollama-nomic-embed-text',
    provider: 'ollama',
    displayName: 'Embedding',
    alias: 'ollama/nomic-embed-text',
    description: 'Local embedding model',
    contextWindow: 8192,
    capabilities: ['EMBEDDINGS'],
    isLocal: true,
    isFree: true,
    providerColor: '#8B5CF6',
    icon: 'LuLayers'
  },

  // Groq
  {
    id: 'groq-llama-3-1-70b',
    provider: 'groq',
    displayName: 'Llama',
    alias: 'groq/llama-3.1-70b',
    description: 'Ultra-fast inference Llama 3.1',
    contextWindow: 131072,
    capabilities: ['CHAT', 'STREAM'],
    badge: 'FAST ⚡',
    providerColor: '#F97316',
    icon: 'SiMeta'
  },
  {
    id: 'groq-mixtral-8x7b',
    provider: 'groq',
    displayName: 'Mixtral',
    alias: 'groq/mixtral-8x7b',
    description: 'Fast MoE model',
    contextWindow: 32768,
    capabilities: ['CHAT', 'STREAM'],
    badge: 'FAST ⚡',
    providerColor: '#F97316',
    icon: 'LuZap'
  },
  {
    id: 'groq-gemma2-9b',
    provider: 'groq',
    displayName: 'Gemma',
    alias: 'groq/gemma2-9b',
    description: 'Fast open model by Google',
    contextWindow: 8192,
    capabilities: ['CHAT', 'STREAM'],
    badge: 'FAST ⚡',
    providerColor: '#F97316',
    icon: 'SiGoogle'
  },

  // Google
  {
    id: 'google-gemini-2-5-flash-lite',
    provider: 'google',
    displayName: 'Gemini 2.5 Flash Lite',
    alias: 'google/gemini-2.5-flash-lite',
    description: 'Fastest 2.5 multimodal model',
    contextWindow: 1048576,
    capabilities: ['CHAT', 'STREAM', 'VISION'],
    badge: 'NEW ✨',
    providerColor: '#4285F4',
    icon: 'Zap'
  },
  {
    id: 'google-gemini-2-0-flash',
    provider: 'google',
    displayName: 'Gemini 2.0 Flash',
    alias: 'google/gemini-2.0-flash',
    description: 'Next gen fast multimodal model',
    contextWindow: 1048576,
    capabilities: ['CHAT', 'STREAM', 'VISION'],
    providerColor: '#4285F4',
    icon: 'Sparkles'
  },
  {
    id: 'google-gemini-1-5-pro',
    provider: 'google',
    displayName: 'Gemini 1.5 Pro',
    alias: 'google/gemini-1.5-pro',
    description: 'Powerful multimodal model with massive context',
    contextWindow: 2000000,
    capabilities: ['CHAT', 'STREAM', 'VISION'],
    providerColor: '#4285F4',
    icon: 'Sparkles'
  },

  // NVIDIA
  {
    id: 'nvidia-nemotron-70b',
    provider: 'nvidia',
    displayName: 'Nemotron',
    alias: 'nvidia/nemotron-70b',
    description: 'NVIDIA customized Llama 3.1 70B',
    contextWindow: 131072,
    capabilities: ['CHAT', 'STREAM'],
    badge: 'GPU 🎮',
    providerColor: '#76B900',
    icon: 'SiNvidia'
  }
];

// Helper to filter models based on the developer .env sandbox string
const enabledProvidersEnv = import.meta.env.VITE_ENABLED_PROVIDERS;

export const modelsConfig = enabledProvidersEnv
  ? allModelsConfig.filter(model => enabledProvidersEnv.includes(model.provider))
  : allModelsConfig;
