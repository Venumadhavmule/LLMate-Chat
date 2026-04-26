import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '../../utils/cn';
import { useSettingsStore } from '../../store';
import { LuCopy as Copy, LuCheck as Check, LuSun as Sun, LuMoon as Moon } from 'react-icons/lu';


interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer = React.memo(({ content, className }: Props) => {
  const { codeTheme, setCodeTheme } = useSettingsStore();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={cn("prose dark:prose-invert max-w-none w-full break-words prose-p:leading-relaxed prose-pre:bg-transparent prose-pre:p-0", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            const extractText = (child: any): string => {
              if (typeof child === 'string') return child;
              if (Array.isArray(child)) return child.map(extractText).join('');
              if (child?.props?.children) return extractText(child.props.children);
              return '';
            };
            const value = extractText(children).replace(/\n$/, '');
            const id = React.useId();

            if (!inline && match) {

              const isDark = codeTheme === 'dark';
              
              return (
                <div className={cn(
                  "relative group rounded-xl overflow-hidden my-6 border transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]",
                  isDark 
                    ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/[0.08]" 
                    : "bg-[#f8fafc] border-black/[0.08]"
                )}>
                  <div className={cn(
                    "flex items-center justify-between px-4 py-2.5 border-b transition-colors duration-200",
                    isDark ? "bg-[#141414] border-white/[0.06]" : "bg-[#f1f5f9] border-black/[0.06]"
                  )}>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        language === 'ts' || language === 'typescript' ? "bg-blue-500" :
                        language === 'js' || language === 'javascript' ? "bg-yellow-400" :
                        language === 'py' || language === 'python' ? "bg-emerald-500" :
                        language === 'rust' ? "bg-orange-600" : "bg-violet-500"
                      )} />
                      <span className={cn(
                        "text-[12px] font-bold uppercase tracking-widest font-mono",
                        isDark ? "text-white/40" : "text-black/40"
                      )}>{language}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCodeTheme(isDark ? 'light' : 'dark')}
                        className={cn(
                          "transition-all p-1.5 rounded-lg active:scale-90 border",
                          isDark 
                            ? "text-white/50 border-white/[0.08] bg-white/[0.04] hover:text-white hover:bg-white/[0.08]" 
                            : "text-black/50 border-black/[0.08] bg-black/[0.04] hover:text-black hover:bg-black/[0.08]"
                        )}
                        title={isDark ? "Light theme" : "Dark theme"}
                      >
                        {isDark ? <Sun size={14} /> : <Moon size={14} />}
                      </button>

                      <button
                        onClick={() => handleCopy(value, id)}
                        className={cn(
                          "flex items-center gap-2 transition-all p-1.5 px-3 rounded-lg border active:scale-95",
                          isDark 
                            ? "text-white/70 border-white/[0.08] bg-white/[0.04] hover:text-white hover:bg-white/[0.08]" 
                            : "text-black/70 border-black/[0.08] bg-black/[0.04] hover:text-black hover:bg-black/[0.08]"
                        )}
                      >
                        {copiedId === id ? (
                          <>
                            <Check size={14} className="text-emerald-500" />
                            <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wide">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span className="text-[11px] font-bold uppercase tracking-wide">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className={cn(
                    "!m-0 !p-5 !bg-transparent text-[13px] overflow-x-auto font-mono leading-relaxed selection:bg-[var(--color-primary)]/30",
                    !isDark && "text-gray-800"
                  )}>
                    <code className={cn(className, !isDark && "hljs-light")} {...props} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }
            return (
              <code className={cn("px-1.5 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-primary)] font-mono text-[0.875em] border border-[var(--color-border)] before:content-hidden after:content-hidden", className)} {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-secondary)] shadow-sm">
                <table className="min-w-full divide-y divide-[var(--color-border)] !m-0 prose-td:px-4 prose-th:px-4 prose-th:py-3 prose-th:text-xs prose-th:uppercase prose-th:tracking-wider">
                  {children}
                </table>
              </div>
            );
          },
          a({ href, children }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] underline underline-offset-4 decoration-2 transition-colors">
                {children}
              </a>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

