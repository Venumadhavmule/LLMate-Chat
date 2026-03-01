import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { cn } from '../../utils/cn';

interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer = React.memo(({ content, className }: Props) => {
  return (
    <div className={cn("prose dark:prose-invert max-w-none w-full break-words prose-p:leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const value = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return (
                <div className="relative group rounded-[var(--radius-md)] overflow-hidden my-4 border border-[#404040] bg-[#1e1e1e]">
                  <div className="flex items-center justify-between px-3 py-1 bg-[#2d2d2d] border-b border-[#404040]">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] lowercase">{language}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(value)}
                      className="text-[var(--color-text-muted)] hover:text-white transition-colors p-1"
                      title="Copy code"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                  <pre className="!m-0 !p-4 !bg-transparent text-[13px] overflow-x-auto">
                    <code className={className} {...props}>
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
