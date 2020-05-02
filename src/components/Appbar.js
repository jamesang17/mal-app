import React from 'react';
import theme from '../themes/Theme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ThemeProvider } from '@material-ui/core/styles';
import firebase from '../firebase';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
    this.signUpRef = React.createRef();
    this.loginRef = React.createRef();
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleMenuItem = this.handleMenuItem.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openDialog(event, value) {
    if (value === "login") {
      this.loginRef.current.handleOpen();
    } else {
      this.signUpRef.current.handleOpen();
    }
  }

  openMenu(event) {
    this.setState({ anchorEl : event.currentTarget });
  }

  closeMenu() {
    this.setState({ anchorEl : null });
  }

  handleMenuItem(event) {
    if (event.currentTarget.innerText.toLowerCase() === "logout") {
      firebase.auth().signOut();
    }
    this.setState({ anchorEl: null });
  }

  displayMenuButtons() {
    const isLoggedIn = this.props.currentUser === undefined || this.props.currentUser === null ? false : true;
    // console.log(this.props.currentUser);
    if (isLoggedIn) {
      return (
        <div>
          <IconButton
            edge="end" aria-label="account of current user"
            aria-controls="menu-appbar" aria-haspopup="true"
            color="inherit"
            onClick={this.openMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleMenuItem}>My account</MenuItem>
            <MenuItem onClick={this.handleMenuItem}>Logout</MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <div>
          <Button color="inherit" onClick={e => this.openDialog(e, "login")}>
            Login
              </Button>
          <Button color="inherit" onClick={e => this.openDialog(e, "signup")}>
            Sign Up
        </Button>
        </div>
      );
    }
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
              {this.displayMenuButtons()}
            </Toolbar>
          </AppBar>
        </div>
        <Login ref={this.loginRef} />
        <SignUp ref={this.signUpRef} />
      </ThemeProvider>
    )
  }
}

export default Appbar;