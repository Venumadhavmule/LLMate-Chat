
/**
 * Robust SSE Stream Reader
 * Handles fragmented chunks, UTF-8 boundary splits, and multi-line SSE data events.
 */
export async function* readStream(response: Response): AsyncGenerator<string, void, unknown> {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Append new chunk to buffer
      buffer += decoder.decode(value, { stream: true });

      // SSE events are separated by double newlines (\n\n or \r\n\r\n)
      // Use a regex to handle both cases while maintaining the last partial chunk
      const boundary = /\r?\n\r?\n/;
      let match;
      
      while ((match = boundary.exec(buffer)) !== null) {
        const part = buffer.slice(0, match.index);
        buffer = buffer.slice(match.index + match[0].length);

        const lines = part.split(/\r?\n/);
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            
            if (data === '[DONE]') return;
            if (data) {
              yield data;
            }
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('[stream] Stream aborted by user');
    } else {
      console.error('[stream] Stream read error:', error);
      throw error;
    }
  } finally {
    reader.releaseLock();
  }
}
