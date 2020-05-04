import React from 'react';
import theme from '../themes/Theme';
import { AppBar, Toolbar, Typography,
        Button, IconButton, Menu,
        MenuItem, TextField, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
    this.switchForm = this.switchForm.bind(this);
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

    if (event.currentTarget.innerText.toLowerCase() === "favorites") {
      console.log("TODO: Make my favorites page.") /* TODO */
    }

    if (event.currentTarget.innerText.toLowerCase() === "my account") {
      console.log("Define My Accounts function.") /* TODO */
    }

    this.setState({ anchorEl: null });
  }

  switchForm(event, value) {
    if (value === "login") {
      this.signUpRef.current.handleClose();
      this.loginRef.current.handleOpen();
    } else {
      this.loginRef.current.handleClose();
      this.signUpRef.current.handleOpen();
    }
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
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.handleMenuItem}>My Account</MenuItem>
            <MenuItem onClick={this.handleMenuItem}>Favorites</MenuItem>
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
      <div>
        <div className={this.props.theme.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" >
                <MenuIcon />
              </IconButton>
              <Grid container alignItems="center" justify="flex-start" direction="row" spacing={10}>
                <Grid item>
                  <Typography variant="h6" style={{ flexGrow: 1, flexDirection: 'row' }}>
                    Anime Guide
                  </Typography>
                </Grid> 
                <Grid item>
                  <TextField label="Enter manga here..." variant="outlined" style={{width:400}}/>
                </Grid>            
              </Grid>
              {this.displayMenuButtons()}
            </Toolbar>
          </AppBar>
        </div>
        <Login theme={this.props.theme} ref={this.loginRef} switchForm={this.switchForm}/>
        <SignUp theme={this.props.theme} ref={this.signUpRef} switchForm={this.switchForm}/>
      </div>
    )
  }
}

export default Appbar;