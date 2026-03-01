import type { ModelConfig } from '../../types/model.types';
import { useModelStore } from '../../store';
import { ModelCapabilityBadge } from './ModelCapabilityBadge';
import { cn } from '../../utils/cn';
import { SiOpenai, SiAnthropic, SiGoogle, SiNvidia, SiMeta, SiOllama } from 'react-icons/si';
import { LuBrainCircuit, LuZap, LuCompass, LuCpu, LuLayers, LuBox, LuWind, LuGem, LuServer, LuCode, LuSparkles } from 'react-icons/lu';

const iconMap: Record<string, any> = {
  SiOpenai, SiAnthropic, SiGoogle, SiNvidia, SiMeta, SiOllama,
  LuBrainCircuit, LuZap, LuCompass, LuCpu, LuLayers, LuBox, LuWind, LuGem, LuServer, LuCode, LuSparkles,
};

export function ModelCard({ model, onClose }: { model: ModelConfig; onClose?: () => void }) {
  const { selectedModel, setModel } = useModelStore();
  const Icon = iconMap[model.icon] || LuBox;
  const isSelected = selectedModel.id === model.id;

  const handleSelect = () => {
    setModel(model);
    if (onClose) onClose();
  };

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all duration-200 overflow-hidden min-h-[140px]",
        isSelected
          ? "border-[var(--color-primary)] bg-[var(--color-primary-glow)] shadow-[var(--shadow-glow)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-muted)] hover:shadow-md"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md text-white shadow-sm" style={{ backgroundColor: model.providerColor }}>
            <Icon size={16} />
          </div>
          <span className="font-semibold text-[var(--color-text)] truncate pr-1">{model.displayName}</span>
        </div>
        {model.badge && (
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-accent)] shrink-0">
            {model.badge}
          </span>
        )}
      </div>

      <p className="text-xs text-[var(--color-text-muted)] mb-4 flex-1">
        {model.description}
      </p>

      <div className="flex flex-wrap gap-1 mt-auto items-center">
        {model.capabilities.slice(0, 3).map(cap => (
          <ModelCapabilityBadge key={cap} capability={cap} />
        ))}
        {model.capabilities.length > 3 && (
          <span className="text-[10px] text-[var(--color-text-muted)] px-1">+{model.capabilities.length - 3}</span>
        )}
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] text-[var(--color-text-dimmed)] font-mono">
        {(model.contextWindow / 1000).toFixed(0)}k ctx
      </div>
    </div>
  );
}
