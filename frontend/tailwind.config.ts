/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    serif: ['Courier', 'serif'],
    mono: ['Consolas', 'monospace'],
  },
  extend: {
    spacing: {
      '8xl': '96rem',
    },
    borderRadius: {
      '4xl': '2rem',
    },
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.gray,
        transparent: 'transparent',
        current: 'currentColor',
        navbarLink: {
          light: colors.gray[800],
          dark: '#fff',
        },
        navbarLinkActive: {
          light: colors.blue[500],
          dark: colors.cyan[500],
        },
        navbarGradient: {
          light:
            'linear-gradient(180deg, rgba(248,250,251,1) 0%, rgba(248,250,251,0.8) 30%, rgba(248,250,251,0) 80%)',
          dark: 'linear-gradient(180deg, rgba(19,26,40,1) 0%, rgba(19,26,40,0.95) 30%, rgba(248,250,251,0) 100%)',
        },
        cardBg: {
          light: '#fff',
          dark: '#10253e',
        },
        cardHeaderBg: {
          light: '#646aea',
          dark: '#18385d',
        },
        hoverShadow: {
          light: '#7450dd',
          dark: '#7450dd',
        },
        footerBg: {
          light: '#F0F0F0',
          dark: '#3d4e6f',
        },
        featuresBg: {
          light: '#8cacec',
          dark: '#0B7498',
        },
        ctaSectionBg: {
          light: 'linear-gradient(90deg, #be59d9, #0072f5)',
          dark: 'linear-gradient(90deg, #be59d9, #0072f5)',
        },
        myTicketsSmallHeading: {
          light: '#000',
          dark: '#F0F0F0',
        },
      },
    },
  },
  plugins: [
    nextui({
      prefix: 'nextui',
      defaultTheme: 'light',
      themes: {
        light: {
          extend: 'light',
          colors: {
            foreground: '#0D001A',
            background: '#f8fafb',
          },
        },
        dark: {
          extend: 'dark',
          colors: {
            foreground: '#f8fafb',
            background: '#0D001A',
          },
        },
      },
    }),
  ],
}
