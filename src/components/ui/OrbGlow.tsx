import { cn } from '../../utils/cn';

export function OrbGlow({ className, color = 'var(--color-primary-glow)' }: { className?: string; color?: string }) {
  return (
    <div
      className={cn('absolute rounded-full blur-3xl pointer-events-none mix-blend-screen opacity-50', className)}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
      }}
    />
  );
}
