import React from 'react';
import type { Message } from '../../types/chat.types';
import { UserMessage } from './UserMessage';
import { AssistantMessage } from './AssistantMessage';

interface Props {
  message: Message;
  isStreaming?: boolean;
  onRegenerate?: () => void;
}

export const MessageItem = React.memo(({ message, isStreaming, onRegenerate }: Props) => {
  if (message.role === 'user') {
    return <UserMessage message={message} />;
  }

  return (
    <AssistantMessage
      message={message}
      isStreaming={isStreaming}
      onRegenerate={onRegenerate}
    />
  );
});
MessageItem.displayName = 'MessageItem';
