/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#16140f',
          raised: '#1c1a14',
          elevated: '#26221a',
          hover: '#2a261d',
        },
        border: {
          subtle: '#2c2820',
          DEFAULT: '#3a352b',
          strong: '#4d4737',
        },
        fg: {
          DEFAULT: '#e8e3d5',
          muted: '#9c9484',
          subtle: '#6a6354',
        },
        accent: {
          DEFAULT: '#c8a165',
          dim: '#a08453',
          glow: 'rgba(200, 161, 101, 0.12)',
        },
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'Georgia', 'Cambria', 'serif'],
        mono: ['"IBM Plex Mono"', 'JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
        sans: ['"IBM Plex Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        smallcaps: '0.12em',
      },
    },
  },
  plugins: [],
};
