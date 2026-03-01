import { useMemo } from 'react';
import { useChatStore } from '../../store';
import { ConversationItem } from './ConversationItem';
import { isToday, isYesterday, differenceInDays } from 'date-fns';
import type { Conversation } from '../../types/chat.types';

export function ConversationList() {
  const { conversations, searchQuery } = useChatStore();

  const filtered = useMemo(() => {
    if (!searchQuery) return conversations;
    return conversations.filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [conversations, searchQuery]);

  const groups = useMemo(() => {
    const pinned: Conversation[] = [];
    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const previous7Days: Conversation[] = [];
    const older: Conversation[] = [];

    filtered.forEach(c => {
      if (c.isPinned) {
        pinned.push(c);
        return;
      }
      if (isToday(c.createdAt)) {
        today.push(c);
      } else if (isYesterday(c.createdAt)) {
        yesterday.push(c);
      } else if (differenceInDays(Date.now(), c.createdAt) <= 7) {
        previous7Days.push(c);
      } else {
        older.push(c);
      }
    });

    return [
      { label: 'Pinned', items: pinned },
      { label: 'Today', items: today },
      { label: 'Yesterday', items: yesterday },
      { label: 'Previous 7 Days', items: previous7Days },
      { label: 'Older', items: older },
    ].filter(g => g.items.length > 0);
  }, [filtered]);

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-4 scroll-smooth">
      {groups.length === 0 ? (
        <div className="text-center px-4 py-8 text-[var(--color-text-muted)] text-sm">
          No conversations found.
        </div>
      ) : (
        groups.map(group => (
          <div key={group.label} className="mt-4 first:mt-2">
            <h3 className="px-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
              {group.label}
            </h3>
            {group.items.map(conv => (
              <ConversationItem key={conv.id} conversation={conv} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
