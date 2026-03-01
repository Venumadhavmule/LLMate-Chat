
interface Props {
  tokens?: number;
  latencyMs?: number;
}

export function UsageBadge({ tokens, latencyMs }: Props) {
  if (!tokens && !latencyMs) return null;

  const ms = latencyMs ? `· ${(latencyMs / 1000).toFixed(1)}s` : '';
  const tok = tokens ? `${tokens} tokens` : '';

  return (
    <div className="inline-flex items-center text-[10px] text-[var(--color-text-dimmed)] mt-1 select-none font-mono">
      {tok} {ms}
    </div>
  );
}
