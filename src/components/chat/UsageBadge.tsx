import { LuZap, LuActivity } from 'react-icons/lu';

interface Props {
  tokens?: number;
  latencyMs?: number;
}

export function UsageBadge({ tokens, latencyMs }: Props) {
  if (!tokens && !latencyMs) return null;

  const seconds = latencyMs ? (latencyMs / 1000).toFixed(2) : null;
  const formattedTokens = tokens ? new Intl.NumberFormat().format(tokens) : null;

  return (
    <div className="inline-flex items-center gap-3 text-[10px] text-[var(--color-text-dimmed)] mt-1.5 select-none font-mono">
      {formattedTokens && (
        <div className="flex items-center gap-1">
          <LuZap className="w-3 h-3 text-amber-400/70" />
          <span>{formattedTokens} tokens</span>
        </div>
      )}
      {seconds && (
        <div className="flex items-center gap-1 border-l border-[var(--color-border)] pl-3">
          <LuActivity className="w-3 h-3 text-emerald-400/70" />
          <span>{seconds}s latency</span>
        </div>
      )}
    </div>
  );
}

