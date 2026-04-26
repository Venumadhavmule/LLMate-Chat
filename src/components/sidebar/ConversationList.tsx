import { useMemo } from 'react';
import { useChatStore } from '../../store';
import { ConversationItem } from './ConversationItem';
import { isToday, isYesterday, differenceInDays } from 'date-fns';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { Conversation } from '../../types/chat.types';

type ListItem = 
  | { type: 'header'; label: string }
  | { type: 'item'; conversation: Conversation };

export function ConversationList() {
  const { conversations, searchQuery } = useChatStore();

  const filtered = useMemo(() => {
    if (!searchQuery) return conversations;
    return conversations.filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [conversations, searchQuery]);

  const flattenedList = useMemo(() => {
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

    const list: ListItem[] = [];
    
    if (pinned.length > 0) {
      list.push({ type: 'header', label: 'Pinned' });
      pinned.forEach(c => list.push({ type: 'item', conversation: c }));
    }
    if (today.length > 0) {
      list.push({ type: 'header', label: 'Today' });
      today.forEach(c => list.push({ type: 'item', conversation: c }));
    }
    if (yesterday.length > 0) {
      list.push({ type: 'header', label: 'Yesterday' });
      yesterday.forEach(c => list.push({ type: 'item', conversation: c }));
    }
    if (previous7Days.length > 0) {
      list.push({ type: 'header', label: 'Previous 7 Days' });
      previous7Days.forEach(c => list.push({ type: 'item', conversation: c }));
    }
    if (older.length > 0) {
      list.push({ type: 'header', label: 'Older' });
      older.forEach(c => list.push({ type: 'item', conversation: c }));
    }

    return list;
  }, [filtered]);

  if (flattenedList.length === 0) {
    return (
      <div className="flex-1 text-center px-4 py-8 text-[var(--color-text-muted)] text-sm">
        No conversations found.
      </div>
    );
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = flattenedList[index];

    if (item.type === 'header') {
      return (
        <div style={style} className="flex items-end pb-1 px-3">
          <h3 className="text-[10px] font-bold text-[var(--color-text-dimmed)] uppercase tracking-widest">
            {item.label}
          </h3>
        </div>
      );
    }

    return (
      <div style={style} className="px-2">
        <ConversationItem conversation={item.conversation} />
      </div>
    );
  };

  return (
    <div className="flex-1 w-full overflow-hidden">
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            height={height}
            width={width}
            itemCount={flattenedList.length}
            itemSize={44} // height of a row
            className="scrollbar-hide"
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}

