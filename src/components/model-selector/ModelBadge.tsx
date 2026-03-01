import { useModelStore } from '../../store';
import { ProviderStatusDot } from './ProviderStatusDot';
import { modelsConfig } from '../../config/models.config';

export function ModelBadge() {
  const { selectedModel } = useModelStore();
  const liveModel = modelsConfig.find(m => m.id === selectedModel.id) || selectedModel;

  return (
    <div className="ml-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-[var(--color-border)] transition-colors shadow-sm">
      <ProviderStatusDot provider={liveModel.provider} />
      <span className="truncate max-w-[120px] sm:max-w-none">{liveModel.displayName}</span>
      <span className="text-[var(--color-text-muted)] text-xs ml-1">▾</span>
    </div>
  );
}
