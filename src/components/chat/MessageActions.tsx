import { useState } from 'react';
import { LuCopy as Copy, LuRefreshCw as RefreshCw, LuThumbsUp as ThumbsUp, LuThumbsDown as ThumbsDown, LuCheck as Check } from 'react-icons/lu';

interface Props {
  content: string;
  onRegenerate?: () => void;
  isStreaming?: boolean;
}

export function MessageActions({ content, onRegenerate, isStreaming }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isStreaming) return null;

  return (
    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        title="Copy text"
      >
        {copied ? <Check size={14} className="text-[var(--color-success)]" /> : <Copy size={14} />}
      </button>

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="p-1.5 rounded-md hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          title="Regenerate response"
        >
          <RefreshCw size={14} />
        </button>
      )}

      <button className="p-1.5 rounded-md hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors ml-2">
        <ThumbsUp size={14} />
      </button>
      <button className="p-1.5 rounded-md hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
        <ThumbsDown size={14} />
      </button>
    </div>
  );
}
