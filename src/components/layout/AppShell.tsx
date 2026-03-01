import { Sidebar } from '../sidebar/Sidebar';
import { MainPanel } from '../layout/MainPanel';
import { OrbGlow } from '../ui/OrbGlow';
import { useUIStore } from '../../store';
import { cn } from '../../utils/cn';

export function AppShell() {
  const { isSidebarOpen, sidebarWidth } = useUIStore();

  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Background noise and orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/assets/grain.png)' }}></div>
      <OrbGlow className="top-[-10%] left-[-10%] w-[40vw] h-[40vw]" color="rgba(124, 58, 237, 0.15)" />
      <OrbGlow className="bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] animate-orb-pulse" color="rgba(167, 139, 250, 0.1)" />

      {/* Main Grid */}
      <div
        className={cn("relative z-10 flex h-full w-full transition-all duration-300 ease-in-out")}
        style={{
          gridTemplateColumns: isSidebarOpen ? `${sidebarWidth}px 1fr` : '0px 1fr',
          display: 'grid'
        }}
      >
        <Sidebar className="translate-x-0" />
        <MainPanel />
      </div>
    </div>
  );
}
