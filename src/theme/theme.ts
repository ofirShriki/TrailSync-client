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
  },
  palette: {
    primary: {
      main: primaryColors.green,
      light: primaryColors.blue,
      dark: primaryColors.orange,
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
