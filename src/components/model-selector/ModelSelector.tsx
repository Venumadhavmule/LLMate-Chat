import { useUIStore } from '../../store';
import { ModelBadge } from './ModelBadge';

export function ModelSelector() {
  const { openModal } = useUIStore();

  return (
    <div onClick={() => openModal('model-selector')} className="flex items-center z-50">
      <ModelBadge />
    </div>
  );
}
