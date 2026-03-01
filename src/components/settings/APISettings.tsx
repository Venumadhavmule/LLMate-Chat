import { useSettingsStore, useModelStore } from '../../store';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function APISettings() {
  const { apiBaseUrl, setApiBaseUrl } = useSettingsStore();
  const { availableProviders } = useModelStore();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-1">LLMate Connection</h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Configure the connection to your local LLMate backend service.</p>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">Base API URL</label>
            <Input
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrl(e.target.value)}
              placeholder="http://localhost:8080/api/v1"
            />
          </div>
          <Button>Save Settings</Button>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--color-border)]">
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">Provider Status</h3>

        <div className="space-y-3 max-w-md">
          {availableProviders.map(p => (
            <div key={p.providerId} className="flex items-center justify-between p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
              <span className="font-medium text-[var(--color-text)]">{p.displayName}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${p.available ? 'bg-[var(--color-success)] shadow-[0_0_8px_var(--color-success)]' : 'bg-[var(--color-error)]'}`}></span>
                <span className="text-xs text-[var(--color-text-muted)] uppercase">{p.available ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          ))}
          {availableProviders.length === 0 && (
            <div className="text-sm text-[var(--color-text-muted)] p-4 border border-dashed rounded-md text-center">No providers loaded yet. Check your connection to LLMate.</div>
          )}
        </div>
      </div>
    </div>
  );
}
