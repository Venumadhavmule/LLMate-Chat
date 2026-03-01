import { useSettingsStore } from '../../store';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/lu';
import { GlassPanel } from '../ui/GlassPanel';
import { cn } from '../../utils/cn';

interface Props {
  onSelectPrompt: (text: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function SuggestedPromptGrid({ onSelectPrompt }: Props) {
  const { savedPrompts } = useSettingsStore();

  const handleSelect = (text: string) => {
    onSelectPrompt(text);
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {savedPrompts.slice(0, 6).map((prompt) => {
        const iconName = ((prompt as any).icon || 'MessageSquare');
        const Icon = (Icons as any)['Lu' + iconName] || Icons.LuMessageSquare;

        return (
          <motion.div key={prompt.id} variants={item}>
            <GlassPanel
              className={cn(
                "p-4 cursor-pointer hover:bg-[var(--color-surface)] transition-all duration-300 group h-full flex flex-col items-start gap-2",
                "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)]"
              )}
              onClick={() => handleSelect(prompt.content)}
            >
              <div className="flex items-center gap-2 text-[var(--color-text)] font-semibold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                <Icon size={18} className="text-[var(--color-primary)] opacity-80" />
                <span>{prompt.title}</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                {(prompt as any).description || prompt.content}
              </p>
            </GlassPanel>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
