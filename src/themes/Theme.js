// Color Scheme
// #6BBEBB
// #577D9A
// #79769D
// #E97979
// #F0BBA4
// #F5DFBF
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
