import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
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
    <div className={cn("prose dark:prose-invert max-w-none w-full break-words prose-p:leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            // Fix: Correctly extract text content from children to avoid [object Object]
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
                  "relative group rounded-[var(--radius-md)] overflow-hidden my-4 border border-[var(--color-border)] transition-colors duration-200",
                  isDark ? "bg-[#1e1e1e]" : "bg-[#f8fafc]"
                )}>
                  <div className={cn(
                    "flex items-center justify-between px-3 py-1.5 border-b border-[var(--color-border)] transition-colors duration-200",
                    isDark ? "bg-[#2d2d2d]" : "bg-[#f1f5f9]"
                  )}>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>{language || 'code'}</span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCodeTheme(isDark ? 'light' : 'dark')}
                        className={cn(
                          "transition-colors p-1 rounded hover:bg-black/10",
                          isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                        )}
                        title={isDark ? "Switch to Light Code Theme" : "Switch to Dark Code Theme"}
                      >
                        {isDark ? <Sun size={14} /> : <Moon size={14} />}
                      </button>
                      <button
                        onClick={() => handleCopy(value, id)}
                        className={cn(
                          "transition-colors p-1 rounded hover:bg-black/10",
                          isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                        )}
                        title="Copy code"
                      >
                        {copiedId === id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <pre className={cn(
                    "!m-0 !p-4 !bg-transparent text-[13px] overflow-x-auto font-mono leading-relaxed",
                    !isDark && "text-gray-800"
                  )}>
                    <code className={cn(className, !isDark && "hljs-light")} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }
            return (
              <code className={cn("px-1.5 py-0.5 rounded bg-[var(--color-surface)] text-[var(--color-accent)] font-mono text-[0.875em] before:content-hidden after:content-hidden", className)} {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 border border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
                <table className="min-w-full divide-y divide-[var(--color-border)] !m-0 prose-td:px-4 prose-th:px-4 prose-th:py-2">
                  {children}
                </table>
              </div>
            );
          },
          a({ href, children }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] underline underline-offset-4">
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
