import type { Message } from '../../types/chat.types';
import { AttachmentPreview } from './AttachmentPreview';
import { motion } from 'framer-motion';

export function UserMessage({ message }: { message: Message }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex mb-6 w-full max-w-4xl mx-auto px-4 justify-end group"
    >
      <div className="flex flex-col items-end max-w-[80%]">
        <span className="text-[10px] font-semibold text-[var(--color-text-dimmed)] mb-1.5 uppercase tracking-wider px-1">
          You
        </span>
        
        <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-3">
              <AttachmentPreview attachments={message.attachments} />
            </div>
          )}

          <div className="text-[14px] text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

