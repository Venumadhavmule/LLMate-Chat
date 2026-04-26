import type { Message } from '../../types/chat.types';
import { AttachmentPreview } from './AttachmentPreview';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MessageActions } from './MessageActions';
import { UsageBadge } from './UsageBadge';
import { StreamingIndicator } from './StreamingIndicator';
import { LuBot as Bot, LuTriangleAlert as AlertTriangle, LuInfo } from 'react-icons/lu';
import { cn } from '../../utils/cn';

interface Props {
  message: Message;
  isStreaming?: boolean;
  onRegenerate?: () => void;
}

export function AssistantMessage({ message, isStreaming, onRegenerate }: Props) {
  const isError = message.status === 'error';

  return (
    <div className="flex mb-6 w-full max-w-4xl mx-auto px-4 group">
      <div className="flex gap-4 max-w-full w-full">
        <div className="shrink-0 mt-1">
          <div className={cn(
            "w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center border",
            isError
              ? "bg-red-500/10 text-red-500 border-red-500/20"
              : "bg-[#10a37f] text-white border-transparent shadow-sm"
          )}>
            {isError ? <AlertTriangle size={16} /> : <Bot size={18} />}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm text-[var(--color-text)]">
                {message.model?.startsWith('GPT') ? 'ChatGPT' : (message.model || 'LLMate')}
              </span>
              {message.provider && (
                <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-surface)] px-1.5 py-0.5 rounded border border-[var(--color-border)] uppercase">
                  {message.provider}
                </span>
              )}
            </div>

            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 mb-3">
                <AttachmentPreview attachments={message.attachments} />
              </div>
            )}

            <div className={cn(
              "text-sm w-full",
              isError && "text-[var(--color-error)]"
            )}>
              {message.content ? (
                <MarkdownRenderer content={message.content} />
              ) : isStreaming ? (
                <StreamingIndicator />
              ) : null}
            </div>

            <div className="flex items-center justify-between mt-1">
              <UsageBadge tokens={message.usage?.totalTokens} latencyMs={message.latencyMs} />
              <MessageActions
                content={message.content}
                onRegenerate={onRegenerate}
                isStreaming={isStreaming}
              />
            </div>

            {isError && (
              <div className="mt-2 text-xs text-[var(--color-error)] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 rounded-md p-2">
                There was an error generating the response. Please try again.
              </div>
            )}

            {message.fallbackNotice && !isError && (
              <div className="mt-2 text-[10px] text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-surface)]/30 rounded px-2 py-1 flex items-center gap-1.5 w-fit">
                <LuInfo size={12} className="text-violet-400" />
                {message.fallbackNotice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
