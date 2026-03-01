import { useMemo, useState } from 'react';
import { useUIStore } from '../../store';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '../ui/Modal';
import { ModelSearchBar } from './ModelSearchBar';
import { ProviderGroup } from './ProviderGroup';
import { ParameterPanel } from './ParameterPanel';
import { modelsConfig } from '../../config/models.config';
import type { ModelCapability } from '../../types/model.types';

export function ModelSelectorModal() {
  const { activeModal, closeModal } = useUIStore();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ModelCapability | 'all'>('all');

  const isOpen = activeModal === 'model-selector';

  const capabilities = useMemo(() => {
    const caps = new Set<ModelCapability>();
    modelsConfig.forEach(m => {
      m.capabilities?.forEach(c => caps.add(c));
    });
    return ['all', ...Array.from(caps)] as Array<ModelCapability | 'all'>;
  }, []);

  const filteredModels = useMemo(() => {
    let result = modelsConfig;

    if (activeFilter !== 'all') {
      result = result.filter(m => m.capabilities?.includes(activeFilter));
    }

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(m =>
        m.displayName.toLowerCase().includes(lower) ||
        m.description.toLowerCase().includes(lower) ||
        m.capabilities?.some(c => c.toLowerCase().includes(lower))
      );
    }

    return result;
  }, [search, activeFilter]);

  const groups = useMemo(() => {
    const providers = Array.from(new Set(filteredModels.map(m => m.provider)));
    return providers.map(p => ({
      provider: p,
      models: filteredModels.filter(m => m.provider === p)
    }));
  }, [filteredModels]);

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <ModalContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-[var(--color-bg)]">
        <div className="p-6 pb-4 border-b border-[var(--color-border)] shrink-0">
          <ModalHeader>
            <ModalTitle>Choose a Model</ModalTitle>
            <ModalDescription>Select an AI model tailored for your current task.</ModalDescription>
          </ModalHeader>
          <div className="mt-4 flex flex-col gap-3">
            <ModelSearchBar value={search} onChange={setSearch} />
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {capabilities.map(cap => (
                <button
                  key={cap}
                  onClick={() => setActiveFilter(cap)}
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors border ${activeFilter === cap
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                    : 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                    }`}
                >
                  {cap === 'all' ? 'All Formats' : cap.charAt(0) + cap.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-2">
          {groups.length === 0 ? (
            <div className="text-center py-10 text-[var(--color-text-muted)]">
              No models found matching "{search}"
            </div>
          ) : (
            groups.map(g => (
              <ProviderGroup
                key={g.provider}
                providerName={g.provider}
                models={g.models}
                onClose={closeModal}
              />
            ))
          )}
        </div>

        <ParameterPanel />
      </ModalContent>
    </Modal>
  );
}
