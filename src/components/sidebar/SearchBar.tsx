import { LuSearch as Search } from 'react-icons/lu';
import { useChatStore, useUIStore } from '../../store';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useChatStore();
  const { isSidebarOpen } = useUIStore();

  if (!isSidebarOpen) return null;

  return (
    <div className="px-4 py-3 shrink-0 border-b border-[var(--color-border)]">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-[var(--color-text-muted)]" size={14} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search history..."
          className="w-full h-8 pl-9 pr-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>
    </div>
  );
}
