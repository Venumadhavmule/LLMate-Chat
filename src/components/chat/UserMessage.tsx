import type { Message } from '../../types/chat.types';
import { AttachmentPreview } from './AttachmentPreview';
import { Avatar } from '../ui/Avatar';

export function UserMessage({ message }: { message: Message }) {
  return (
    <div className="flex justify-end mb-6 w-full max-w-4xl mx-auto px-4 group">
      <div className="flex max-w-[85%] md:max-w-[75%] gap-4">
        <div className="flex flex-col items-end">
          {message.attachments && message.attachments.length > 0 && (
            <AttachmentPreview attachments={message.attachments} />
          )}

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] px-4 py-3 rounded-[var(--radius-xl)] rounded-tr-sm shadow-sm">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>

        <div className="shrink-0 mt-1">
          <Avatar size="sm" fallback="U" className="bg-[var(--color-primary)] text-white border-none" />
        </div>
      </div>
    </div>
  );
}
