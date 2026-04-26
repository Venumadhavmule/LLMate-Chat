import { create } from 'zustand';
import type { InputMode, Attachment } from '../types/chat.types';

interface UIState {
  isSidebarOpen: boolean;
  sidebarWidth: number;
  activeModal: 'settings' | 'model-selector' | 'export' | null;
  inputMode: InputMode;
  isRecording: boolean;
  pendingAttachments: Attachment[];
  isGenerating: boolean;
  abortController: AbortController | null;
  pendingTemplateText: string | null;
  showPreview: boolean;

  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  openModal: (name: UIState['activeModal']) => void;
  closeModal: () => void;
  setInputMode: (mode: InputMode) => void;
  setRecording: (bool: boolean) => void;
  addAttachment: (file: Attachment) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
  setGenerating: (bool: boolean) => void;
  setAbortController: (ctrl: AbortController | null) => void;
  setPendingTemplateText: (text: string | null) => void;
  togglePreview: () => void;
  setShowPreview: (bool: boolean) => void;
  stopGeneration: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSidebarOpen: true,
  sidebarWidth: 260,
  activeModal: null,
  inputMode: 'text',
  isRecording: false,
  pendingAttachments: [],
  isGenerating: false,
  abortController: null,
  pendingTemplateText: null,
  showPreview: false,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarWidth: (width) => set({ sidebarWidth: width }),
  openModal: (name) => set({ activeModal: name }),
  closeModal: () => set({ activeModal: null }),
  setInputMode: (mode) => set({ inputMode: mode }),
  setRecording: (bool) => set({ isRecording: bool }),
  addAttachment: (file) => set((state) => ({ pendingAttachments: [...state.pendingAttachments, file] })),
  removeAttachment: (id) => set((state) => ({ pendingAttachments: state.pendingAttachments.filter(a => a.id !== id) })),
  clearAttachments: () => set({ pendingAttachments: [] }),
  setGenerating: (bool) => set({ isGenerating: bool }),
  setAbortController: (ctrl) => set({ abortController: ctrl }),
  setPendingTemplateText: (text) => set({ pendingTemplateText: text }),
  togglePreview: () => set((state) => ({ showPreview: !state.showPreview })),
  setShowPreview: (bool) => set({ showPreview: bool }),
  stopGeneration: () => {
    const ctrl = get().abortController;
    if (ctrl) {
      ctrl.abort();
      set({ abortController: null, isGenerating: false });
    }
  },
}));
