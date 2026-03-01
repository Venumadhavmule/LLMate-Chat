import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/layout/AppShell';
import { Toaster } from 'react-hot-toast';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { SettingsModal } from './components/settings/SettingsModal';
import { ExportModal } from './components/settings/ExportModal';
import { useSettingsStore } from './store';

const queryClient = new QueryClient();

export function App() {
  // Initialize global hooks
  useKeyboardShortcuts();
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
      <SettingsModal />
      <ExportModal />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }
      }} />
    </QueryClientProvider>
  );
}
