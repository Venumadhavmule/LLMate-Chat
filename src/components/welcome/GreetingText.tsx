import { useSettingsStore } from '../../store';
import { motion } from 'framer-motion';

export function GreetingText() {
  const { userName } = useSettingsStore();

  return (
    <div className="text-center mb-10 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-display font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text)] to-[var(--color-accent-warm)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Hello, {userName || 'there'}
      </motion.h1>
      <motion.p
        className="text-lg text-[var(--color-text-muted)] font-medium max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        How can I help you today?
      </motion.p>
    </div>
  );
}
