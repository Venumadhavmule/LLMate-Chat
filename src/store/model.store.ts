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
  systemPrompt: 'You are LLMate, an expert AI assistant.',
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
