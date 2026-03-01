import React from 'react';
import type { Conversation } from '../../types/chat.types';
import { useChatStore } from '../../store';
import { cn } from '../../utils/cn';
import { LuMessageSquare as MessageSquare, LuTrash as Trash, LuPin as Pin } from 'react-icons/lu';
import { FiMoreHorizontal as MoreHorizontal, FiEdit2 as Edit2 } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/Dropdown';

interface Props {
  conversation: Conversation;
}

export const ConversationItem = React.memo(({ conversation }: Props) => {
  const { activeConversationId, setActiveConversation, deleteConversation, pinConversation } = useChatStore();

  const isActive = activeConversationId === conversation.id;

  return (
    <div
      onClick={() => setActiveConversation(conversation.id)}
      className={cn(
        "group flex items-center justify-between px-3 py-2 mt-1 rounded-md cursor-pointer transition-colors text-sm",
        isActive
          ? "bg-[var(--color-surface)] text-[var(--color-text)]"
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]/50 hover:text-[var(--color-text)]"
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden w-full">
        <MessageSquare size={14} className="shrink-0" />
        <span className="truncate">{conversation.title}</span>
      </div>

      <div className={cn("hidden items-center group-hover:flex ml-2", isActive && "flex")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-muted)] focus:outline-none" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); pinConversation(conversation.id); }}>
              <Pin size={14} className="mr-2" />
              {conversation.isPinned ? 'Unpin' : 'Pin'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); /* rename logic mapped via store modal later */ }}>
              <Edit2 size={14} className="mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[var(--color-error)] focus:text-[var(--color-error)]"
              onClick={(e) => { e.stopPropagation(); deleteConversation(conversation.id); }}
            >
              <Trash size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});
