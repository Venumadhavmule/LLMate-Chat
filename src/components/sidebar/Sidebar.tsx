import { cn } from '../../utils/cn';
import { useUIStore } from '../../store';
import { SidebarHeader } from './SidebarHeader';
import { SearchBar } from './SearchBar';
import { NavLinks } from './NavLinks';
import { ConversationList } from './ConversationList';
import { UserProfile } from './UserProfile';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { isSidebarOpen, sidebarWidth } = useUIStore();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] transition-all duration-300 z-30 overflow-hidden",
        className
      )}
      style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0px' }}
    >
      <SidebarHeader />
      <SearchBar />
      <NavLinks />
      <ConversationList />
      <UserProfile />
    </aside>
  );
}
