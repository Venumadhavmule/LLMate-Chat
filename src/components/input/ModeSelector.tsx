import { useUIStore } from '../../store';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { LuType, LuMic, LuImage, LuLayers } from 'react-icons/lu';
import type { InputMode } from '../../types/chat.types';

const modes: { id: InputMode; label: string; icon: any }[] = [
  { id: 'text', label: 'Text', icon: LuType },
  { id: 'voice', label: 'Voice', icon: LuMic },
  { id: 'image-gen', label: 'Image', icon: LuImage },
  { id: 'embed', label: 'Embed', icon: LuLayers },
];

export function ModeSelector() {
  const { inputMode, setInputMode } = useUIStore();

  return (
    <div className="flex p-1 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)] self-start mb-2">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = inputMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => setInputMode(mode.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-lg",
              isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-mode"
                className="absolute inset-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className="relative z-10 w-3.5 h-3.5" />
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
