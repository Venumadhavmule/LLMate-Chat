import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[var(--radius-md)] whitespace-nowrap text-sm font-medium ring-offset-[var(--color-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-200',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-glow)]',
        secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)] border border-[var(--color-border)]',
        ghost: 'hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] text-[var(--color-text-muted)]',
        danger: 'bg-[var(--color-error)] text-white hover:bg-red-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs rounded-[var(--radius-sm)]',
        lg: 'h-12 px-8 rounded-[var(--radius-lg)] text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
