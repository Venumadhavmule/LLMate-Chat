import { useState, useRef, useEffect } from 'react';
import { AttachButton } from './AttachButton';
import { VoiceButton } from './VoiceButton';
import { SendButton } from './SendButton';
import { AttachedFileChip } from './AttachedFileChip';
import { useUIStore, useModelStore } from '../../store';
import { useChat } from '../../hooks/useChat';
import { useFileUpload } from '../../hooks/useFileUpload';
import { FileDropZone } from './FileDropZone';
import { ModeSelector } from './ModeSelector';
import { InputToolbar } from './InputToolbar';
import { MarkdownRenderer } from '../chat/MarkdownRenderer';
import { motion, AnimatePresence } from 'framer-motion';

export function InputArea() {
  const [input, setInput] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    pendingAttachments, 
    isGenerating, 
    pendingTemplateText, 
    setPendingTemplateText,
    inputMode,
    showPreview,
    setShowPreview
  } = useUIStore();
  
  const { selectedModel } = useModelStore();
  const { processFiles } = useFileUpload();
  const { sendMessage } = useChat();

  useEffect(() => {
    if (pendingTemplateText !== null) {
      setInput(pendingTemplateText);
      setPendingTemplateText(null);
      setShowPreview(false);
      
      // Auto-focus and adjust height
      if (textareaRef.current) {
        textareaRef.current.focus();
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
            textareaRef.current.setSelectionRange(pendingTemplateText.length, pendingTemplateText.length);
          }
        }, 0);
      }
    }
  }, [pendingTemplateText, setPendingTemplateText]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setLiveTranscript('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const submit = () => {
    const finalMessage = (input + (liveTranscript ? (input ? ' ' : '') + liveTranscript : '')).trim();
    if ((finalMessage || pendingAttachments.length > 0) && !isGenerating) {
      sendMessage(finalMessage);
      setInput('');
      setLiveTranscript('');
      setShowPreview(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isCmdEnter = e.key === 'Enter' && (e.metaKey || e.ctrlKey);
    const isPlainEnter = e.key === 'Enter' && !e.shiftKey;

    if (isCmdEnter || isPlainEnter) {
      e.preventDefault();
      submit();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (e.clipboardData.files.length > 0) {
      await processFiles(e.clipboardData.files);
    }
  };

  const hasContent = input.trim().length > 0 || pendingAttachments.length > 0 || liveTranscript.length > 0;

  return (
    <div className="relative w-full z-10 px-4 pb-3">
      {/* Top Gradient Fade to blend with chat scroll */}
      <div className="absolute top-[-40px] left-0 right-0 h-[40px] bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto">
        <ModeSelector />

        <FileDropZone>
          <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-[var(--radius-2xl)] p-2 shadow-2xl transition-all duration-300 focus-within:border-[var(--color-primary)]/40">
            {pendingAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 p-2">
                {pendingAttachments.map(att => (
                  <AttachedFileChip key={att.id} attachment={att} />
                ))}
              </div>
            )}

            <div className="relative flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                {showPreview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="min-h-[44px] max-h-[300px] overflow-y-auto px-4 py-3 prose prose-invert prose-sm max-w-none"
                  >
                    <MarkdownRenderer content={input || '_No content to preview_' } />
                  </motion.div>
                ) : (
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end px-2"
                  >
                    <div className="flex pb-2">
                      <AttachButton />
                    </div>

                    <textarea
                      id="chat-message-input"
                      ref={textareaRef}
                      value={input + (liveTranscript ? (input ? ' ' : '') + liveTranscript : '')}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      placeholder={
                        inputMode === 'voice' ? "Listening..." :
                        inputMode === 'image-gen' ? "Describe an image..." :
                        inputMode === 'embed' ? "Enter text for embeddings..." :
                        `Message ${selectedModel.displayName}...`
                      }
                      className="flex-1 bg-transparent border-0 outline-none resize-none px-3 py-3 text-[15px] text-[var(--color-text)] min-h-[44px] max-h-[25vh] leading-relaxed placeholder:text-[var(--color-text-dimmed)]"
                      rows={1}
                    />

                    <div className="flex items-center gap-1.5 pb-2">
                      <VoiceButton 
                        onTextEntry={(text) => {
                          setInput(prev => (prev + ' ' + text).trim());
                          setLiveTranscript('');
                        }} 
                        onLiveUpdate={(text) => setLiveTranscript(text)}
                      />
                      <SendButton onSend={submit} disabled={!hasContent && !isGenerating} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <InputToolbar />
          </div>
        </FileDropZone>
        
        <div className="mt-1.5 text-[10px] text-center text-[var(--color-text-dimmed)] opacity-50 uppercase tracking-tight">
          LLMate can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}


