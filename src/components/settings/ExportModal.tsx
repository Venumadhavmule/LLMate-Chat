import { useUIStore, useChatStore } from '../../store';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '../ui/Modal';
import { Button } from '../ui/Button';
import { LuFileJson as FileJson, LuFileText as FileText } from 'react-icons/lu';

export function ExportModal() {
  const { activeModal, closeModal } = useUIStore();
  const { conversations, activeConversationId } = useChatStore();

  const isOpen = activeModal === 'export';

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCurrentJSON = () => {
    const chat = conversations.find(c => c.id === activeConversationId);
    if (!chat) return;
    downloadFile(JSON.stringify(chat, null, 2), `${chat.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_export.json`, 'application/json');
    closeModal();
  };

  const exportCurrentMD = () => {
    const chat = conversations.find(c => c.id === activeConversationId);
    if (!chat) return;

    let md = `# ${chat.title}\n\n`;
    chat.messages.forEach(m => {
      md += `### ${m.role === 'user' ? 'You' : (m.model || 'AI')}\n`;
      md += `${m.content}\n\n`;
    });

    downloadFile(md, `${chat.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_export.md`, 'text/markdown');
    closeModal();
  };

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <ModalContent className="max-w-md bg-[var(--color-bg)]">
        <ModalHeader>
          <ModalTitle>Export Conversation</ModalTitle>
          <ModalDescription>Download the current conversation to your device.</ModalDescription>
        </ModalHeader>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={exportCurrentMD}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] transition-all bg-[var(--color-bg-secondary)]"
          >
            <FileText size={32} className="text-blue-400" />
            <span className="font-medium text-sm text-[var(--color-text)]">Markdown (.md)</span>
          </button>

          <button
            onClick={exportCurrentJSON}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] transition-all bg-[var(--color-bg-secondary)]"
          >
            <FileJson size={32} className="text-yellow-400" />
            <span className="font-medium text-sm text-[var(--color-text)]">JSON (.json)</span>
          </button>
        </div>

        <div className="flex justify-end mt-8">
          <Button variant="ghost" onClick={closeModal}>Cancel</Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
