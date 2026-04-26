import { LuCommand, LuArrowBigUp, LuChevronUp } from 'react-icons/lu';

interface ShortcutItemProps {
  label: string;
  keys: string[];
  description: string;
}

function ShortcutItem({ label, keys, description }: ShortcutItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
        <span className="text-xs text-[var(--color-text-muted)]">{description}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {keys.map((key, i) => (
          <kbd 
            key={i}
            className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text)] shadow-sm"
          >
            {key === 'Cmd' ? <LuCommand size={10} /> : 
             key === 'Shift' ? <LuArrowBigUp size={10} /> : 
             key === 'Alt' ? <LuChevronUp size={10} className="rotate-0" /> : 
             key}
          </kbd>
        ))}
      </div>
    </div>
  );
}

export function ShortcutSettings() {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const cmdKey = isMac ? 'Cmd' : 'Ctrl';

  const shortcuts = [
    { label: 'New Chat', keys: [cmdKey, 'N'], description: 'Start a fresh conversation' },
    { label: 'Toggle Sidebar', keys: [cmdKey, 'B'], description: 'Show or hide the sidebar' },
    { label: 'Model Selector', keys: [cmdKey, 'K'], description: 'Switch between AI models' },
    { label: 'Settings', keys: [cmdKey, ','], description: 'Open settings modal' },
    { label: 'Toggle Theme', keys: [cmdKey, 'Shift', 'L'], description: 'Switch between light and dark mode' },
    { label: 'Markdown Preview', keys: [cmdKey, 'Shift', 'P'], description: 'Preview your message before sending' },
    { label: 'Focus Input', keys: ['/'], description: 'Quickly jump to the message box' },
    { label: 'Clear Chat', keys: [cmdKey, 'Shift', 'Backspace'], description: 'Delete all messages in current chat' },
    { label: 'Delete Chat', keys: [cmdKey, 'Shift', 'D'], description: 'Remove the current conversation' },
  ];

  const modeShortcuts = [
    { label: 'Text Mode', keys: ['Alt', '1'], description: 'Standard chat interface' },
    { label: 'Voice Mode', keys: ['Alt', '2'], description: 'Voice-to-text input' },
    { label: 'Image Mode', keys: ['Alt', '3'], description: 'Generate AI images' },
    { label: 'Embed Mode', keys: ['Alt', '4'], description: 'Convert text to embeddings' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-[var(--color-text)] uppercase tracking-wider opacity-70">General</h3>
        <div className="bg-[var(--color-bg-secondary)]/50 rounded-lg border border-[var(--color-border)] px-4">
          {shortcuts.map((s, i) => (
            <ShortcutItem key={i} {...s} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-[var(--color-text)] uppercase tracking-wider opacity-70">Input Modes</h3>
        <div className="bg-[var(--color-bg-secondary)]/50 rounded-lg border border-[var(--color-border)] px-4">
          {modeShortcuts.map((s, i) => (
            <ShortcutItem key={i} {...s} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 text-xs text-[var(--color-text-muted)] italic">
        Tip: You can use <kbd className="px-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] not-italic">Esc</kbd> to close any modal or exit markdown preview.
      </div>
    </div>
  );
}
