import React from 'react';
import theme from '../themes/Theme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ThemeProvider } from '@material-ui/core/styles';

function AccountMenu() {
  return (
    <IconButton
    edge="end" aria-label="account of current user"
    aria-controls="menu-appbar" aria-haspopup="true"
    color="inherit"
    >
      <AccountCircle />
    </IconButton>
  )
}

export default class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  shouldDisplayAccountMenu() {
    if (this.props.isLoggedIn === "TRUE") {
      return (
        <AccountMenu />
      )
    }
    return (
      <Button color="inherit" onClick={this.handleLogin}>
        Login
      </Button>
    )
  }

  handleLogin(obj) {
    console.log("Trying to login");
    this.props.handleLogin("LOGIN");
  }

  render() {
    return (
      <ThemeProvider theme={theme} >
        <div className={theme.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1}}>
                Anime Guide
              </Typography>
              {this.shouldDisplayAccountMenu()}
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    )
  }
}
