import { useUIStore } from '../../store';
import { LuPanelLeftClose as PanelLeftClose, LuPanelLeftOpen as PanelLeftOpen } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { ModelSelector } from '../model-selector/ModelSelector';
import { TopBarActions } from './TopBarActions';
import { ModelSelectorModal } from '../model-selector/ModelSelectorModal';

export function TopBar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between px-4 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)] z-20">
        <div className="flex items-center gap-2">
          {/* Custom Tooltip Wrapper */}
          <div className={cn("relative group", isSidebarOpen ? "md:hidden" : "flex")}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
              className="hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </Button>
            {/* Tooltip */}
            {!isSidebarOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Open sidebar
              </div>
            )}
          </div>
          <ModelSelector />
        </div>

        <TopBarActions />
      </header>
      <ModelSelectorModal />
    </>
  );
}
