import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ModelConfig, ModelParameters } from '../types/model.types';
import type { ProviderInfoDto } from '../types/api.types';
import { modelsConfig } from '../config/models.config';
import { APP_CONFIG } from '../config/app.config';

interface ModelState {
  selectedModel: ModelConfig;
  parameters: ModelParameters;
  availableProviders: ProviderInfoDto[];
  lastFetchedAt: number | null;
  setModel: (model: ModelConfig) => void;
  setParameters: (patch: Partial<ModelParameters>) => void;
  setAvailableProviders: (providers: ProviderInfoDto[]) => void;
  resetParameters: () => void;
}

const defaultModel = modelsConfig.find(m => m.alias === APP_CONFIG.defaultModel) || modelsConfig[0];
const defaultParams: ModelParameters = {
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: `You are LLMate, a highly advanced, expert AI assistant. Your primary goal is to provide extremely accurate, perfected, and meticulously detailed responses without omitting any salient information.

STRICT CONSTRAINTS & FORMATTING:
1. NO EMOJIS: You must never use emojis or emoticons under any circumstances.
2. NO DENSE PARAGRAPHS: Do not output massive walls of text. Break down complex information into highly readable bulleted or numbered lists.
3. FOLLOW-UP INITIATIVE: If the user's request is ambiguous, lacks crucial context, or could be improved with more information, you MUST proactively ask specific follow-up questions before or after providing your initial insights.
4. ACCURACY ABOVE ALL: Prioritize factual correctness and technical perfection. Think step-by-step for complex logic.`,
  stream: true,
};

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      selectedModel: defaultModel,
      parameters: defaultParams,
      availableProviders: [],
      lastFetchedAt: null,

      setModel: (model) => set({ selectedModel: model }),
      setParameters: (patch) => set((state) => ({ parameters: { ...state.parameters, ...patch } })),
      setAvailableProviders: (providers) => set({ availableProviders: providers, lastFetchedAt: Date.now() }),
      resetParameters: () => set({ parameters: defaultParams }),
    }),
    {
      name: 'llmate-model-storage',
    }
  )
);
