import { useState } from 'react';
import type { ModelConfig } from '../../types/model.types';
import { ModelCard } from './ModelCard';
import { LuChevronDown as ChevronDown, LuChevronRight as ChevronRight } from 'react-icons/lu';
import { ProviderStatusDot } from './ProviderStatusDot';

interface Props {
  providerName: string;
  models: ModelConfig[];
  onClose?: () => void;
}

export function ProviderGroup({ providerName, models, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (models.length === 0) return null;

  return (
    <div className="mb-6">
      <div
        className="flex items-center gap-2 cursor-pointer mb-3 select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={16} className="text-[var(--color-text-muted)]" /> : <ChevronRight size={16} className="text-[var(--color-text-muted)]" />}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">{providerName}</h3>
        <ProviderStatusDot provider={providerName.toLowerCase()} />
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pl-6">
          {models.map(model => (
            <ModelCard key={model.id} model={model} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}
