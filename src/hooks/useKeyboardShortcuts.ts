import { useEffect } from 'react';
import { useUIStore, useChatStore, useModelStore } from '../store';

export function useKeyboardShortcuts() {
  const { toggleSidebar, openModal, setInputMode, inputMode } = useUIStore();
  const { createConversation } = useChatStore();
  const { selectedModel } = useModelStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && e.key === 'k') {
        e.preventDefault();
        openModal('model-selector');
      }

      if (cmdOrCtrl && e.key === 'n') {
        e.preventDefault();
        createConversation(selectedModel.alias, selectedModel.provider);
      }

      if (cmdOrCtrl && e.key === ',') {
        e.preventDefault();
        openModal('settings');
      }

      if (cmdOrCtrl && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }

      if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setInputMode(inputMode === 'voice' ? 'text' : 'voice');
      }

      if (e.key === '/') {
        // Focus search/input 
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        const input = document.getElementById('chat-message-input');
        if (input) input.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, openModal, createConversation, setInputMode, inputMode, selectedModel]);
}
