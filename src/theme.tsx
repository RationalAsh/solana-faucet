import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#1A1A1A',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

export default theme;