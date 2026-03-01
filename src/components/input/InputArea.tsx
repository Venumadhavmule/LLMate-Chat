import { useState, useRef } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { AttachButton } from './AttachButton';
import { VoiceButton } from './VoiceButton';
import { SendButton } from './SendButton';
import { AttachedFileChip } from './AttachedFileChip';
import { useUIStore, useModelStore } from '../../store';
import { useChat } from '../../hooks/useChat';
import { useFileUpload } from '../../hooks/useFileUpload';
import { FileDropZone } from './FileDropZone';

export function InputArea() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { pendingAttachments, isGenerating } = useUIStore();
  const { selectedModel } = useModelStore();
  const { processFiles } = useFileUpload();
  const { sendMessage } = useChat();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const submit = () => {
    if ((input.trim() || pendingAttachments.length > 0) && !isGenerating) {
      sendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (e.clipboardData.files.length > 0) {
      await processFiles(e.clipboardData.files);
    }
  };

  const hasContent = input.trim().length > 0 || pendingAttachments.length > 0;

  return (
    <div className="relative w-full z-10">
      <div className="absolute -top-6 left-2 right-2 text-center text-[10px] text-[var(--color-text-dimmed)] opacity-0 animate-in fade-in fill-mode-forwards delay-1000">
        AI-generated content may be incorrect. Verify important information.
      </div>

      <FileDropZone>
        <GlassPanel className="p-2 transition-shadow focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 focus-within:border-[var(--color-primary)]">
          {pendingAttachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 p-1 border-b border-[var(--color-border)]">
              {pendingAttachments.map(att => (
                <AttachedFileChip key={att.id} attachment={att} />
              ))}
            </div>
          )}

          <div className="flex items-end bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] p-1">
            <div className="flex px-1 pb-1">
              <AttachButton />
            </div>

            <textarea
              id="chat-message-input"
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={`Message using ${selectedModel.displayName}...`}
              className="flex-1 bg-transparent border-0 outline-none resize-none px-2 py-2.5 text-sm text-[var(--color-text)] min-h-[44px] max-h-[200px]"
              rows={1}
            />

            <div className="flex items-center gap-1 p-1 pb-1">
              <VoiceButton />
              <SendButton onSend={submit} disabled={!hasContent && !isGenerating} />
            </div>
          </div>
        </GlassPanel>
      </FileDropZone>
    </div>
  );
}
