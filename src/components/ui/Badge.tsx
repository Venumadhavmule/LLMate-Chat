import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--color-primary)]/20 text-[var(--color-accent)]',
        secondary: 'border-transparent bg-[var(--color-surface)] text-[var(--color-text)]',
        outline: 'text-[var(--color-text-muted)] border-[var(--color-border)]',
        success: 'border-transparent bg-[var(--color-success)]/20 text-[var(--color-success)]',
        warning: 'border-transparent bg-[var(--color-warning)]/20 text-[var(--color-warning)]',
        danger: 'border-transparent bg-[var(--color-error)]/20 text-[var(--color-error)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
