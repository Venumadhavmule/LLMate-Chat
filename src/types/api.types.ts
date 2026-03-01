export interface ChatRequestDto {
  provider?: string;
  model: string;          // alias or "provider/model" shorthand
  messages: { role: string; content: string }[];
  temperature?: number;
  maxTokens?: number;
  tenantId?: string;
}

export interface ChatResponseDto {
  id: string;
  provider: string;
  model: string;
  content: string;
  choices: { role: string; content: string }[];
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
  createdAt: string;
}

export interface ProviderInfoDto {
  providerId: string;
  displayName: string;
  capabilities: string[];
  available: boolean;
}

export interface StreamChunk {
  delta?: string;
  done?: boolean;
  provider?: string;
  model?: string;
}

export interface EmbeddingRequestDto {
  inputs: string[];
  model?: string;
}

export interface EmbeddingResponseDto {
  vectors: number[][];
  dimensions: number;
}
