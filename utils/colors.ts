import type { Colors } from './colors.type';
export const colors: Colors = {
  background: {
    bgPaper: 'rgb(255, 250, 235)',
    shadow: 'rgba(0,0,0,0.25)',
    borderRed: 'rgba(205, 0, 50, .5)',
    holeBlue: 'rgb(75, 75, 100)',
    lineBlue: 'rgba(0, 150, 200, 0.5)',
  },
  stickyNotes: {
    yellow: 'rgb(248, 229, 58)',
    pink: 'rgb(241, 126, 176)',
    green: 'rgb(175, 247, 42)',
    orange: 'rgb(252, 183, 18)',
    blue: 'rgb(84, 205, 242)',
  },
  icons: {
    iconBlue: '#4a88da', // not used in LogoIcon, but keep
    iconLightBlue: '#5e9cea',
    iconDark: '#262626', // not used in LogoIcon, but keep
    logoBlack: '#2b2b2b',
    logoBlue: '#1697c9',
    logoPurple: '#bd2bb5',
    logoGray: '#bac0cd',
    logoLightGray: '#ccd0da',
  },
  text: {
    pencilDark: 'rgba(50, 50, 50, 0.95)',
  },
};
