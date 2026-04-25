import { apiClient } from './client';
import { readStream } from './stream';
import { API_CONFIG } from '../config/api.config';
import type { ChatRequestDto, ChatResponseDto, EmbeddingRequestDto, EmbeddingResponseDto, StreamChunk } from '../types/api.types';

export const chatApi = {
  chatBlocking: async (req: ChatRequestDto): Promise<ChatResponseDto> => {
    const res = await apiClient.post<ChatResponseDto>('/api/v1/chat', req);
    return res.data;
  },

  chatStream: async (
    req: ChatRequestDto,
    onChunk: (chunk: StreamChunk) => void,
    signal: AbortSignal
  ): Promise<void> => {
    console.log('[chatApi] Starting stream request:', req.model, req);
    
    try {
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
        console.error('[chatApi] HTTP Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      console.log('[chatApi] Stream response OK, reading...');

      for await (const chunkStr of readStream(response)) {
        try {
          const chunk = JSON.parse(chunkStr) as StreamChunk;
          onChunk(chunk);
          if (chunk.done) {
            console.log('[chatApi] Stream finished');
            break;
          }
        } catch (e) {
          console.error('[chatApi] Failed to parse stream chunk:', chunkStr, e);
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('[chatApi] Stream aborted');
      } else {
        console.error('[chatApi] Stream error:', err);
        throw err;
      }
    }
  },

  embed: async (req: EmbeddingRequestDto): Promise<EmbeddingResponseDto> => {
    const res = await apiClient.post<EmbeddingResponseDto>('/api/v1/embed', req);
    return res.data;
  }
};
