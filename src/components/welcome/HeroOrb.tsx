import { motion } from 'framer-motion';

export function HeroOrb() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center mb-8">
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl opacity-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="relative z-10 w-24 h-24 rounded-full border border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.3)] bg-gradient-to-br from-violet-500/20 to-violet-900/20 backdrop-blur-md flex items-center justify-center overflow-hidden"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-violet-300 blur-sm mix-blend-overlay" />
        <svg viewBox="0 0 24 24" fill="none" className="absolute w-8 h-8 text-white stroke-current stroke-2 drop-shadow-lg">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      </motion.div>
    </div>
  );
}
