import { cn } from '../../utils/cn';
import { SidebarHeader } from './SidebarHeader';
import { SearchBar } from './SearchBar';
import { NavLinks } from './NavLinks';
import { ConversationList } from './ConversationList';
import { UserProfile } from './UserProfile';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--color-bg-secondary)] z-30 overflow-hidden",
        className
      )}
    >
      <SidebarHeader />
      <SearchBar />
      <NavLinks />
      <ConversationList />
      <UserProfile />
    </aside>
  );
}

