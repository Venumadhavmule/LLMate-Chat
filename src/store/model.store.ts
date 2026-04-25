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
  activeTemplateId: string | null;
  setModel: (model: ModelConfig) => void;
  setParameters: (patch: Partial<ModelParameters>) => void;
  setAvailableProviders: (providers: ProviderInfoDto[]) => void;
  setActiveTemplateId: (id: string | null) => void;
  resetParameters: () => void;
}

const defaultModel = modelsConfig.find(m => m.alias === APP_CONFIG.defaultModel) || modelsConfig[0];
const defaultParams: ModelParameters = {
  temperature: 0.7,
  maxTokens: 4096,
  systemPrompt: `You are LLMate, a world-class, elite AI assistant. Your primary directive is to provide technically perfect, meticulously accurate, and highly professional responses.

CORE OPERATIONAL PRINCIPLES:
1. PRECISION & TRUTH: Prioritize factual correctness above all else. If you are unsure or if the information is speculative, explicitly state so. Avoid hallucinations at all costs.
2. NO FILLER/PLUFF: Do not use unnecessary pleasantries, conversational filler, or "nonsense". Be direct, concise, and informative.
3. STRUCTURED CLARITY: Use highly structured output. Break down complex information into logical sections with clear headings and bulleted/numbered lists. Avoid massive walls of text.
4. NO EMOJIS: You must NEVER use emojis or emoticons in your responses.
5. PROACTIVE REFINEMENT: If a user's request is underspecified or ambiguous, provide the most likely interpretation but also ask specific follow-up questions to refine the solution.
6. STEP-BY-STEP REASONING: For complex logic, mathematical problems, or architectural designs, utilize a chain-of-thought approach to ensure no errors in the final output.`,
  stream: true,
};

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      selectedModel: defaultModel,
      parameters: defaultParams,
      availableProviders: [],
      lastFetchedAt: null,
      activeTemplateId: null,

      setModel: (model) => set({ selectedModel: model }),
      setParameters: (patch) => set((state) => ({ parameters: { ...state.parameters, ...patch } })),
      setAvailableProviders: (providers) => set({ availableProviders: providers, lastFetchedAt: Date.now() }),
      setActiveTemplateId: (id) => set({ activeTemplateId: id }),
      resetParameters: () => set({ parameters: defaultParams, activeTemplateId: null }),
    }),
    {
      name: 'llmate-model-storage',
      version: 1, // Increment to force reset of old 1000 token limit
    }
  )
);
