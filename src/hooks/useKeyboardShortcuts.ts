import { useEffect } from 'react';
import { useUIStore, useChatStore, useModelStore, useSettingsStore } from '../store';

export function useKeyboardShortcuts() {
  const { toggleSidebar, openModal, closeModal, setInputMode, inputMode, togglePreview, showPreview, setShowPreview, activeModal } = useUIStore();
  const { createConversation, clearConversation, activeConversationId, deleteConversation } = useChatStore();
  const { selectedModel } = useModelStore();
  const { theme, setTheme } = useSettingsStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      const alt = e.altKey;
      const shift = e.shiftKey;

      // --- Modals & Global ---

      // Esc: Close Modals / Unfocus / Exit Preview
      if (e.key === 'Escape') {
        if (activeModal) {
          closeModal();
        } else if (showPreview) {
          setShowPreview(false);
        } else {
          (document.activeElement as HTMLElement)?.blur();
        }
        return;
      }

      // Cmd + K: Model Selector
      if (cmdOrCtrl && e.key === 'k') {
        e.preventDefault();
        openModal('model-selector');
      }

      // Cmd + , : Settings
      if (cmdOrCtrl && e.key === ',') {
        e.preventDefault();
        openModal('settings');
      }

      // Cmd + B : Toggle Sidebar
      if (cmdOrCtrl && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }

      // Cmd + Shift + L : Toggle Theme
      if (cmdOrCtrl && shift && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }

      // --- Chat & Input ---

      // Cmd + N : New Chat
      if (cmdOrCtrl && e.key === 'n') {
        e.preventDefault();
        createConversation(selectedModel.alias, selectedModel.provider);
      }

      // Cmd + Shift + P : Toggle Preview
      if (cmdOrCtrl && shift && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        togglePreview();
      }

      // / : Focus Input
      if (e.key === '/' && !cmdOrCtrl && !alt) {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        const input = document.getElementById('chat-message-input');
        if (input) input.focus();
      }

      // --- Modes (Alt + 1-4) ---
      if (alt && e.key === '1') { e.preventDefault(); setInputMode('text'); }
      if (alt && e.key === '2') { e.preventDefault(); setInputMode('voice'); }
      if (alt && e.key === '3') { e.preventDefault(); setInputMode('image-gen'); }
      if (alt && e.key === '4') { e.preventDefault(); setInputMode('embed'); }

      // --- Conversation Management ---

      // Cmd + Shift + Backspace : Clear Chat
      if (cmdOrCtrl && shift && e.key === 'Backspace') {
        if (activeConversationId) {
          e.preventDefault();
          if (confirm('Clear all messages in this conversation?')) {
            clearConversation(activeConversationId);
          }
        }
      }

      // Cmd + Shift + D : Delete Chat
      if (cmdOrCtrl && shift && e.key.toLowerCase() === 'd') {
        if (activeConversationId) {
          e.preventDefault();
          if (confirm('Delete this conversation?')) {
            deleteConversation(activeConversationId);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    toggleSidebar, openModal, closeModal, createConversation, setInputMode, 
    inputMode, selectedModel, theme, setTheme, togglePreview, showPreview, 
    setShowPreview, activeModal, activeConversationId, clearConversation, deleteConversation
  ]);
}

