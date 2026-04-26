import { LuShare as Share, LuSettings as Settings, LuDownload as Download, LuSun as Sun, LuMoon as Moon } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { useUIStore, useSettingsStore } from '../../store';

export function TopBarActions() {
  const { openModal } = useUIStore();
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]" 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={theme === 'dark' ? 'Switch to Light Mode (Cmd+Shift+L)' : 'Switch to Dark Mode (Cmd+Shift+L)'}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
      <Button variant="ghost" size="icon" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]" onClick={() => openModal('export')} title="Export Chat">
        <Download size={18} />
      </Button>
      <Button variant="ghost" size="icon" className="hidden sm:flex text-[var(--color-text-muted)] hover:text-[var(--color-text)]" title="Share Chat">
        <Share size={18} />
      </Button>
      <Button variant="ghost" size="icon" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]" onClick={() => openModal('settings')} title="Settings (Cmd+,)">
        <Settings size={18} />
      </Button>
    </div>
  );
}
