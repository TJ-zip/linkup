import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0B1020',
          700: '#232B43',
          500: '#5A6480',
          300: '#98A1B8'
        },
        brand: {
          50: '#EEF0FF',
          100: '#DDE1FF',
          300: '#A9B0F7',
          500: '#5B5BD6',
          600: '#4A48C4',
          700: '#3B39A6'
        },
        mint: {
          50: '#E9F9F2',
          300: '#7EDCB7',
          500: '#12B886',
          700: '#0C8F69'
        },
        sun: {
          50: '#FFF6E6',
          500: '#E8A317',
          700: '#B77C0B'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F6F7FB',
          sunken: '#EEF0F6'
        }
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
        '3xl': '26px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,16,32,0.04), 0 8px 24px rgba(11,16,32,0.06)',
        lift: '0 2px 6px rgba(11,16,32,0.06), 0 18px 40px rgba(11,16,32,0.10)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 260ms ease-out both',
        'pop-in': 'pop-in 180ms ease-out both'
      }
    }
  },
  plugins: []
};

export default config;
