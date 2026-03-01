import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        llm: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          border: 'var(--color-border)',
          primary: 'var(--color-primary)',
          accent: 'var(--color-accent)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        }
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'orb-pulse': 'orb-pulse 4s ease-in-out infinite',
        'orb-float': 'orb-float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 0.6s steps(3) infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16,1,0.3,1)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config
