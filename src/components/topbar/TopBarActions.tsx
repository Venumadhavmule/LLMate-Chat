import { LuShare as Share, LuSettings as Settings, LuDownload as Download } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { useUIStore } from '../../store';

export function TopBarActions() {
  const { openModal } = useUIStore();

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]" onClick={() => openModal('export')} title="Export Chat">
        <Download size={18} />
      </Button>
      <Button variant="ghost" size="icon" className="hidden sm:flex text-[var(--color-text-muted)] hover:text-[var(--color-text)]" title="Share Chat">
        <Share size={18} />
      </Button>
      <Button variant="ghost" size="icon" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]" onClick={() => openModal('settings')} title="Settings">
        <Settings size={18} />
      </Button>
    </div>
  );
}
