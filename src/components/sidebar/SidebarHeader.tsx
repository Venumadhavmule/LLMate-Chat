import { useNavigate } from 'react-router-dom';
import { useChatStore, useModelStore, useUIStore } from '../../store';
import { Button } from '../ui/Button';
import { LuPlus as Plus, LuPanelLeftClose as PanelLeftClose, LuPanelLeftOpen as PanelLeftOpen, LuBrainCircuit as BrainCircuit } from 'react-icons/lu';

export function SidebarHeader() {
  const navigate = useNavigate();
  const { createConversation } = useChatStore();
  const { selectedModel } = useModelStore();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  const handleNewChat = () => {
    const id = createConversation(selectedModel.alias, selectedModel.provider);
    navigate(`/chat/${id}`);
  };

  return (
    <div className={`flex flex-col gap-4 shrink-0 ${isSidebarOpen ? 'p-3' : 'p-3 items-center'}`}>
      <div className={`flex w-full items-center ${isSidebarOpen ? 'justify-between' : 'flex-col gap-4'}`}>
        {isSidebarOpen && (
          <div className="flex items-center gap-2 group cursor-pointer ml-1" onClick={() => navigate('/')}>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-white/20 transition-colors">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-medium text-sm tracking-tight text-[var(--color-text)]">LLMate</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewChat}
            title="New Chat (Cmd+N)"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] h-8 w-8"
          >
            <Plus size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            title={isSidebarOpen ? "Close sidebar (Cmd+B)" : "Open sidebar (Cmd+B)"}
            className={`hidden md:flex text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] h-8 w-8`}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
