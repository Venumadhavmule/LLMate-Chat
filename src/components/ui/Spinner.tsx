import { cn } from '../../utils/cn';
import { LuLoader as Loader2 } from 'react-icons/lu';

export function Spinner({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Loader2
      className={cn('animate-spin text-[var(--color-primary)]', className)}
      size={size}
    />
  );
}
