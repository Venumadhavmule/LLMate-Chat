import { useChatStore, useModelStore, useUIStore } from '../../store';
import { Button } from '../ui/Button';
import { LuPlus as Plus, LuPanelLeftClose as PanelLeftClose, LuPanelLeftOpen as PanelLeftOpen, LuBrainCircuit as BrainCircuit } from 'react-icons/lu';

export function SidebarHeader() {
  const { createConversation } = useChatStore();
  const { selectedModel } = useModelStore();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className={`flex flex-col gap-4 border-b border-[var(--color-border)] shrink-0 ${isSidebarOpen ? 'p-4' : 'p-4 items-center'}`}>
      <div className={`flex w-full items-center ${isSidebarOpen ? 'justify-between' : 'flex-col gap-4'}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && <span className="font-display font-semibold text-lg tracking-tight">LLMate</span>}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className={`hidden md:flex text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] ${isSidebarOpen ? '' : 'w-10 h-10'}`}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </Button>
      </div>

      <Button
        className={`shadow-none border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text)] ${isSidebarOpen ? 'w-full justify-start gap-2 h-10' : 'w-10 h-10 p-0 justify-center'}`}
        onClick={() => createConversation(selectedModel.alias, selectedModel.provider)}
        title="New Chat"
      >
        <Plus size={16} />
        {isSidebarOpen && "New Chat"}
      </Button>
    </div>
  );
}
