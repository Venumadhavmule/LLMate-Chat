import type { DragEvent } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { LuCloudUpload as UploadCloud } from 'react-icons/lu';

interface Props {
  children: React.ReactNode;
}

export function FileDropZone({ children }: Props) {
  const { isDragging, setIsDragging, processFiles } = useFileUpload();

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute -inset-4 z-50 bg-[var(--color-bg)]/80 backdrop-blur-sm border-2 border-dashed border-[var(--color-primary)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mb-4 text-[var(--color-primary)] animate-bounce">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-xl font-semibold text-[var(--color-text)]">Drop files or images here</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Will be attached to your next prompt</p>
        </div>
      )}
      {children}
    </div>
  );
}
