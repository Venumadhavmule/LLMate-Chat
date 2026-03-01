import { useRef, useEffect } from 'react';
import type { Message } from '../../types/chat.types';
import { MessageItem } from './MessageItem';
import { useAutoScroll } from '../../hooks/useAutoScroll';

interface Props {
  messages: Message[];
  isGenerating: boolean;
  onRegenerate: (msgId: string) => void;
}

export function MessageList({ messages, isGenerating, onRegenerate }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollToBottom } = useAutoScroll(scrollRef);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating, scrollToBottom]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 w-full overflow-y-auto pb-4 pt-6 scroll-smooth"
    >
      {messages.map((msg, index) => {
        const isLastAndGenerating = isGenerating && index === messages.length - 1 && msg.role === 'assistant';

        return (
          <MessageItem
            key={msg.id}
            message={msg}
            isStreaming={isLastAndGenerating}
            onRegenerate={() => onRegenerate(msg.id)}
          />
        );
      })}

      {/* Invisible element to ensure scroll padding at bottom */}
      <div className="h-4 w-full float-left clear-both" />
    </div>
  );
}
