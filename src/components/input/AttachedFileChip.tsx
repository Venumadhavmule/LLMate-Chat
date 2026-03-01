import type { Attachment } from '../../types/chat.types';
import { useUIStore } from '../../store';
import { LuX as X, LuFileText as FileText, LuFile as File, LuImage as ImageIcon } from 'react-icons/lu';

export function AttachedFileChip({ attachment }: { attachment: Attachment }) {
  const { removeAttachment } = useUIStore();

  const getIcon = () => {
    if (attachment.type === 'image') return <ImageIcon size={14} className="text-violet-400" />;
    if (attachment.type === 'pdf') return <File size={14} className="text-red-400" />;
    if (attachment.type === 'text' || attachment.type === 'code') return <FileText size={14} className="text-blue-400" />;
    return <File size={14} className="text-gray-400" />;
  };

  return (
    <div className="flex items-center gap-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md px-2 py-1 text-xs animate-in zoom-in-95 duration-200">
      {getIcon()}
      <span className="max-w-[100px] truncate text-[var(--color-text)]">{attachment.name}</span>
      <button
        onClick={() => removeAttachment(attachment.id)}
        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)] rounded-full p-0.5 transition-colors ml-1"
      >
        <X size={12} />
      </button>
    </div>
  );
}
