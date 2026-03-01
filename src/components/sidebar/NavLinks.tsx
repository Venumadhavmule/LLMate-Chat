import { LuCompass as Compass, LuLibrary as Library, LuFiles as Files } from 'react-icons/lu';
import { useUIStore } from '../../store';

export function NavLinks() {
  const { isSidebarOpen } = useUIStore();
  return (
    <div className={`py-3 border-b border-[var(--color-border)] flex flex-col gap-1 shrink-0 ${isSidebarOpen ? 'px-2' : 'px-2 items-center'}`}>
      <a href="#" className={`flex items-center rounded-md transition-colors font-medium ${isSidebarOpen ? 'gap-3 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface)]' : 'justify-center w-10 h-10 hover:bg-[var(--color-surface)]'}`} title="Explore">
        <Compass size={20} className="text-[var(--color-primary)]" />
        {isSidebarOpen && "Explore"}
      </a>
      <a href="#" className={`flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-md transition-colors font-medium ${isSidebarOpen ? 'gap-3 px-3 py-2 text-sm' : 'justify-center w-10 h-10'}`} title="Library">
        <Library size={20} />
        {isSidebarOpen && "Library"}
      </a>
      <a href="#" className={`flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-md transition-colors font-medium ${isSidebarOpen ? 'gap-3 px-3 py-2 text-sm' : 'justify-center w-10 h-10'}`} title="Files">
        <Files size={20} />
        {isSidebarOpen && "Files"}
      </a>
    </div>
  );
}
