import { useCallback, useState } from 'react';
import type { Attachment } from '../types/chat.types';
import { useUIStore } from '../store';
import { APP_CONFIG } from '../config/app.config';
import toast from 'react-hot-toast';

export function useFileUpload() {
  const { addAttachment, removeAttachment, pendingAttachments, clearAttachments } = useUIStore();
  const [isDragging, setIsDragging] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    if (pendingAttachments.length + fileArray.length > APP_CONFIG.maxAttachments) {
      toast.error(`Maximum ${APP_CONFIG.maxAttachments} attachments allowed`);
      return;
    }

    for (const file of fileArray) {
      if (file.size > APP_CONFIG.maxFileSizeMB * 1024 * 1024) {
        toast.error(`${file.name} exceeds ${APP_CONFIG.maxFileSizeMB}MB limit`);
        continue;
      }

      try {
        let type: Attachment['type'] = 'other';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type === 'application/pdf') type = 'pdf';
        else if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.json') || file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.css') || file.name.endsWith('.html')) type = 'code';

        const base64 = await fileToBase64(file);

        const attachment: Attachment = {
          id: crypto.randomUUID(),
          name: file.name,
          type,
          mimeType: file.type,
          size: file.size,
          url: URL.createObjectURL(file), // for local preview
          base64: base64
        };

        addAttachment(attachment);
      } catch (e) {
        console.error('File parsing error', e);
        toast.error(`Failed to process ${file.name}`);
      }
    }
  }, [addAttachment, pendingAttachments.length]);

  return {
    isDragging,
    setIsDragging,
    processFiles,
    removeAttachment,
    clearAttachments
  };
}
