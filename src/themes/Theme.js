// Color Scheme
// #6BBEBB - light turquoise
// ##62d9d5 - richer light turquoise
// #577D9A - light blue 
// #79769D - light purple 
// #E97979 - light pink 
// #F0BBA4 - peach 
// #F5DFBF - beige 
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#577D9A',
    },
    secondary: {
      main: '#AFB3B4',
    }
  },
  title: {
    flexGrow: 1,
  },
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
  root: {
    flexGrow: 1
  },
  spacing: 2,
});
