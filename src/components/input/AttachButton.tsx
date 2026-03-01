import { useRef } from 'react';
import { LuPaperclip as Paperclip, LuMonitorUp as MonitorUp } from 'react-icons/lu';
import { useFileUpload } from '../../hooks/useFileUpload';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/Dropdown';

export function AttachButton() {
  const { processFiles } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf,.txt,.md,.json,.js,.ts,.tsx,.css,.html,.csv"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors focus:outline-none"
          >
            <Paperclip size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8}>
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <MonitorUp size={14} className="mr-2" />
            Upload from computer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
