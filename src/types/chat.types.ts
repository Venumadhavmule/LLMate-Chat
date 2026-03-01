export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'streaming' | 'complete' | 'error';
export type InputMode = 'text' | 'voice' | 'image-gen' | 'embed';

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'text' | 'code' | 'other';
  mimeType: string;
  size: number;           // bytes
  url: string;            // local object URL for preview
  base64?: string;        // for sending to API
}

export interface Message {
  id: string;             // UUID
  conversationId: string;
  role: MessageRole;
  content: string;        // Markdown string
  status: MessageStatus;
  model?: string;         // Which model generated this
  provider?: string;
  attachments?: Attachment[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs?: number;
  createdAt: number;      // Unix timestamp ms
  error?: string;
}

export interface Conversation {
  id: string;
  title: string;          // Auto-generated from first message
  messages: Message[];
  model: string;          // Alias used
  provider: string;
  createdAt: number;
  updatedAt: number;
  isPinned?: boolean;
  tags?: string[];
}
