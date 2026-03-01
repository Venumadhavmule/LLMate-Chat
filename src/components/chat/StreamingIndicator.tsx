export function StreamingIndicator() {
  return (
    <div className="flex items-center gap-1 mt-2 mb-1 px-1">
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
