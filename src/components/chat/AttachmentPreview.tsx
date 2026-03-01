import type { Attachment } from '../../types/chat.types';
import { LuFileText as FileText, LuFile as File } from 'react-icons/lu';

export function AttachmentPreview({ attachments }: { attachments: Attachment[] }) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {attachments.map(att => {
        if (att.type === 'image') {
          return (
            <div key={att.id} className="relative rounded-md overflow-hidden border border-[var(--color-border)] w-32 h-32 bg-[var(--color-surface)]">
              <img src={att.url || att.base64} alt={att.name} className="w-full h-full object-cover" />
            </div>
          );
        }

        return (
          <div key={att.id} className="flex items-center gap-2 p-2 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm max-w-[200px]">
            {att.type === 'pdf' ? (
              <File className="text-red-400 shrink-0" size={16} />
            ) : att.type === 'text' || att.type === 'code' ? (
              <FileText className="text-blue-400 shrink-0" size={16} />
            ) : (
              <File className="text-gray-400 shrink-0" size={16} />
            )}
            <div className="truncate text-xs font-medium text-[var(--color-text)]">
              {att.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
