import type { ModelCapability } from '../../types/model.types';
import { Badge } from '../ui/Badge';

export function ModelCapabilityBadge({ capability }: { capability: ModelCapability }) {
  const capMap: Record<ModelCapability, { label: string; variant: any }> = {
    CHAT: { label: 'Chat', variant: 'secondary' },
    STREAM: { label: 'Stream', variant: 'secondary' },
    VISION: { label: 'Vision', variant: 'default' },
    TOOLS: { label: 'Tools', variant: 'outline' },
    JSON: { label: 'JSON', variant: 'outline' },
    EMBEDDINGS: { label: 'Embed', variant: 'secondary' },
    REASONING: { label: 'Reasoning', variant: 'success' },
  };

  const info = capMap[capability];
  if (!info) return null;

  return (
    <Badge variant={info.variant} className="text-[10px] leading-none py-1">
      {info.label}
    </Badge>
  );
}
