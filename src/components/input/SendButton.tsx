import { LuSend as Send, LuSquare as Square } from 'react-icons/lu';
import { useUIStore } from '../../store';
import { cn } from '../../utils/cn';

interface Props {
  onSend: () => void;
  disabled: boolean;
}

export function SendButton({ onSend, disabled }: Props) {
  const { isGenerating, stopGeneration } = useUIStore();

  if (isGenerating) {
    return (
      <button
        type="button"
        onClick={() => stopGeneration()}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
        title="Stop generating"
      >
        <Square size={14} className="fill-current" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSend}
      disabled={disabled}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200",
        disabled
          ? "bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50 border border-[var(--color-border)]"
          : "bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)] hover:bg-[var(--color-primary-hover)] border border-transparent"
      )}
      title="Send message"
    >
      <Send size={14} className={cn(disabled ? "" : "ml-0.5")} />
    </button>
  );
}
