import { useSettingsStore } from '../../store';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function GeneralSettings() {
  const { userName, setUserName } = useSettingsStore();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-1">Profile</h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Manage your personal information.</p>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">Name</label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--color-border)]">
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-1">Data Storage</h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">All your chats and settings are stored locally in your browser.</p>

        <div className="flex gap-3">
          <Button variant="secondary">Export All Data</Button>
          <Button variant="danger">Clear All Data</Button>
        </div>
      </div>
    </div>
  );
}
