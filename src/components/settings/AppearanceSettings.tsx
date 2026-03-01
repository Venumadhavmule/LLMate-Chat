import { useSettingsStore } from '../../store';

export function AppearanceSettings() {
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-1">Theme</h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Customize the look and feel of LLMate.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${theme === 'dark' ? 'border-[var(--color-primary)] bg-[var(--color-primary-glow)]' : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'}`}
            onClick={() => setTheme('dark')}
          >
            <div className="font-medium mb-3 text-[var(--color-text)]">Dark Space (Default)</div>
            <div className="w-full h-24 rounded-md bg-[#09090b] border border-[#27272a] p-3 flex flex-col gap-2">
              <div className="w-full h-3 bg-[#27272a] rounded-sm"></div>
              <div className="w-3/4 h-3 bg-[#7c3aed] rounded-sm self-end"></div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${theme === 'light' ? 'border-[var(--color-primary)] bg-[var(--color-primary-glow)]' : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'}`}
            onClick={() => setTheme('light')}
          >
            <div className="font-medium mb-3 text-[var(--color-text)]">Light Mode</div>
            <div className="w-full h-24 rounded-md bg-zinc-100 border border-zinc-200 p-3 flex flex-col gap-2 opacity-60">
              <div className="w-full h-3 bg-zinc-200 rounded-sm"></div>
              <div className="w-3/4 h-3 bg-violet-500 rounded-sm self-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
