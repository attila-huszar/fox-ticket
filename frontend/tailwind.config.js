import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export const content = [
  './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {},
};
export const darkMode = 'class';
export const plugins = [
  nextui({
    themes: {
      light: {
        colors: {
          background: '#f8fafb',
          navbarActive: '#cee4fe',
          navbarLink: '#000',
          navbarGradient:
            'linear-gradient(180deg, rgba(248,250,251,1) 0%, rgba(248,250,251,0.8) 30%, rgba(248,250,251,0) 80%)',
          cardBackground: '#fff',
          cardHeaderBackground: '#646aea',
          hoverShadow: '#7450dd',
          footerBackground: '#F0F0F0',
          featuresLogoBackground: '#8cacec',
          ctaSectionBackgroundImg: 'linear-gradient(90deg, #be59d9, #0072f5)',
          myTicketsSmallHeading: '#000000',
        },
      },
      dark: {
        colors: {
          background: '#131a28',
          navbarActive: '#10253e',
          navbarLink: '#fff',
          navbarGradient:
            'linear-gradient(180deg, rgba(19,26,40,1) 0%, rgba(19,26,40,0.95) 30%, rgba(248,250,251,0) 100%)',
          featuresBackground: '#0B7498',
          featuresLogoBackground: '#3d4e6f',
          cardBackground: '#10253e',
          cardHeaderBackground: '#18385d',
          hoverShadow: '#7450dd',
          footerBackground: '#3d4e6f',
          ctaSectionBackgroundImg: 'linear-gradient(90deg, #be59d9, #0072f5)',
          myTicketsSmallHeading: '#F0F0F0',
        },
      },
    },
  }),
];
