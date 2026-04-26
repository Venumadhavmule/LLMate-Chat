import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import { MainPanel } from '../layout/MainPanel';
import { OrbGlow } from '../ui/OrbGlow';
import { useUIStore } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';

export function AppShell() {
  const { isSidebarOpen, sidebarWidth } = useUIStore();

  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Background noise and orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/assets/grain.png)' }}></div>
      <OrbGlow className="top-[-5%] left-[-5%] w-[50vw] h-[50vw] opacity-30" color="rgba(16, 163, 127, 0.05)" />
      <OrbGlow className="bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] animate-orb-pulse opacity-20" color="rgba(16, 163, 127, 0.03)" />

      {/* Main Layout */}
      <div className="relative z-10 flex h-full w-full">
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: sidebarWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="h-full overflow-hidden border-r border-[var(--color-border)]"
            >
              <Sidebar className="w-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 min-w-0 h-full relative">
          <Routes>
            <Route path="/" element={<MainPanel />} />
            <Route path="/chat/:id" element={<MainPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

