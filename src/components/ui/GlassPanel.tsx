import { cn } from '../../utils/cn';

export function GlassPanel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
