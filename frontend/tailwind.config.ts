import { type Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
      emerald: colors.emerald,
      sky: colors.sky,
      indigo: colors.indigo,
      orange: colors.orange,
      tahiti: {
        light: '#67e8f9',
        DEFAULT: '#06b6d4',
        dark: '#0e7490',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      animation: {
        shake: 'shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: '#0D001A',
            background: '#f8fafb',
          },
        },
        dark: {
          colors: {
            foreground: '#f8fafb',
            background: '#0D001A',
          },
        },
      },
    }),
  ],
} satisfies Config
