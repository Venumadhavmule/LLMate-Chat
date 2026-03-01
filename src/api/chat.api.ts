import { apiClient } from './client';
import { readStream } from './stream';
import { API_CONFIG } from '../config/api.config';
import type { ChatRequestDto, ChatResponseDto, EmbeddingRequestDto, EmbeddingResponseDto } from '../types/api.types';

export const chatApi = {
  chatBlocking: async (req: ChatRequestDto): Promise<ChatResponseDto> => {
    const res = await apiClient.post<ChatResponseDto>('/api/v1/chat', req);
    return res.data;
  },

  chatStream: async (
    req: ChatRequestDto,
    onDelta: (text: string) => void,
    signal: AbortSignal
  ): Promise<void> => {
    const response = await fetch(`${API_CONFIG.baseURL}/api/v1/chat/stream/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(req),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    for await (const chunk of readStream(response)) {
      if (chunk.delta) {
        onDelta(chunk.delta);
      }
      if (chunk.done) break;
    }
  },

  embed: async (req: EmbeddingRequestDto): Promise<EmbeddingResponseDto> => {
    const res = await apiClient.post<EmbeddingResponseDto>('/api/v1/embed', req);
    return res.data;
  }
};
