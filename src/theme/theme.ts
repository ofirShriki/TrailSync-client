import { createTheme } from '@mui/material/styles';
import { primaryColors, secondaryColors, neutralColors } from './colors';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: `'DM Sans', sans-serif`,
    button: {
      textTransform: 'none',
      letterSpacing: 'normal',
      fontWeight: 700,
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.15,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: '1.375rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
  palette: {
    primary: {
      main: primaryColors.green,
      light: primaryColors.blue,
      dark: primaryColors.lightGreen,
    },
    secondary: {
      main: secondaryColors.peach,
      light: secondaryColors.lightBlue,
      dark: secondaryColors.lightGreen,
    },
    neutral: {
      main: neutralColors.slate,
      light: neutralColors.offWhite,
      dark: neutralColors.darkGray,
    },
    background: {
      default: neutralColors.offWhite,
      paper: neutralColors.white,
    },
  },
});
