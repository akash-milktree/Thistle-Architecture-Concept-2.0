import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        thistle: {
          black: '#2F3B36',
          white: '#EDEDE9',
          pink: '#DAAEBB',
          green: '#8F9952',
          gray: '#71776E',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      fontSize: {
        'fluid-display': 'var(--font-display)',
        'fluid-h1': 'var(--font-h1)',
        'fluid-h2': 'var(--font-h2)',
        'fluid-h3': 'var(--font-h3)',
        'fluid-h4': 'var(--font-h4)',
        'fluid-h5': 'var(--font-h5)',
        'fluid-h6': 'var(--font-h6)',
        'fluid-lg': 'var(--font-text-lg)',
        'fluid-base': 'var(--font-text-base)',
        'fluid-sm': 'var(--font-text-sm)',
      },
      spacing: {
        'fl-section-lg': 'var(--space-section-lg)',
        'fl-section': 'var(--space-section)',
        'fl-section-sm': 'var(--space-section-sm)',
        'fl-8': 'var(--space-8)',
        'fl-7': 'var(--space-7)',
        'fl-6': 'var(--space-6)',
        'fl-5': 'var(--space-5)',
        'fl-4': 'var(--space-4)',
        'fl-3': 'var(--space-3)',
        'fl-2': 'var(--space-2)',
        'fl-1': 'var(--space-1)',
        'fl-margin': 'var(--site-margin)',
      },
    },
  },
  plugins: [],
};

export default config;
