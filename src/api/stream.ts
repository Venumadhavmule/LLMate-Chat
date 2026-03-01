import type { StreamChunk } from '../types/api.types';

export async function* readStream(response: Response): AsyncGenerator<StreamChunk> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No body in response');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      // Keep the last partial line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('data:')) {
          const jsonStr = trimmed.slice(5).trim();
          if (jsonStr === '[DONE]') {
            yield { done: true };
            return;
          }

          try {
            const parsed: StreamChunk = JSON.parse(jsonStr);
            yield parsed;
          } catch (e) {
            console.error('Failed to parse SSE JSON chunk:', jsonStr, e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
