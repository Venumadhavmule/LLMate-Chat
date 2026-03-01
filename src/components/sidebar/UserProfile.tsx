import { useSettingsStore, useUIStore } from '../../store';
import { LuSettings as Settings } from 'react-icons/lu';

export function UserProfile() {
  const { userName } = useSettingsStore();
  const { openModal, isSidebarOpen } = useUIStore();

  return (
    <div
      className={`p-3 border-t border-[var(--color-border)] flex items-center hover:bg-[var(--color-surface)] cursor-pointer transition-colors shrink-0 group ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}
      onClick={() => openModal('settings')}
      title="Settings"
    >
      <div className={`flex items-center ${isSidebarOpen ? 'gap-3' : ''}`}>
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
          {userName?.substring(0, 2) || 'U'}
        </div>
        {isSidebarOpen && <div className="text-sm font-medium truncate max-w-[120px]">{userName}</div>}
      </div>
      {isSidebarOpen && <Settings size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />}
    </div>
  );
}
