import { useEffect, useRef, useState } from 'react';
import { useUIStore } from '../store';

export function useAutoScroll(dependency: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollPaused, setAutoScrollPaused] = useState(false);
  const { isGenerating } = useUIStore();

  const scrollToBottom = () => {
    if (scrollRef.current && !isAutoScrollPaused) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (isAtBottom) {
      setAutoScrollPaused(false);
    } else {
      setAutoScrollPaused(true);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [dependency, isGenerating]);

  return { scrollRef, isAutoScrollPaused, scrollToBottom, handleScroll };
}
