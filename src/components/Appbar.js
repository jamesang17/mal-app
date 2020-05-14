import React from 'react';
import { AppBar, Toolbar, Typography,
        Button, IconButton, Menu,
        MenuItem, Snackbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from '../firebase';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Search from './search/search';
import CustomBackdrop from './CustomBackdrop';

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      backdrop: false
    }
    this.signUpRef = React.createRef();
    this.loginRef = React.createRef();
    this.handleMenuItem = this.handleMenuItem.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.switchForm = this.switchForm.bind(this);
  }

  openDialog(event, value) {
    if (value === "login") {
      this.loginRef.current.handleOpen();
    } else {
      this.signUpRef.current.handleOpen();
    }
  }

  handleMenuItem(event) {
    this.setState({ backdrop: true });
    if (event.currentTarget.innerText.toLowerCase() === "logout") {
      firebase.auth().signOut().then(() => {
        this.setState({ backdrop: false });
      });
    }

    if (event.currentTarget.innerText.toLowerCase() === "anime guide") {
      this.props.setScreen("");
      this.setState({ backdrop: false });
      console.log("TODO: Make my favorites page.") /* TODO */
    }

    if (event.currentTarget.innerText.toLowerCase() === "my account") {
      this.props.setScreen("myaccount");
      this.setState({ backdrop: false });
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
            style={{ marginRight: "5%"}}
            onClick={e => this.setState({ anchorEl: e.currentTarget })}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={e => this.setState({ anchorEl: null })}
          >
            <MenuItem onClick={this.handleMenuItem}>My Account</MenuItem>
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
              <Button onClick={e => this.handleMenuItem} >
                <Typography variant="h6" nowrap="true" style={{ color: "white"}}>
                  Anime Guide
                </Typography>
              </Button>
              <div style={{flexGrow: 1, marginLeft: "2vw"}}>
                <Search theme={this.props.theme} />
              </div>
              {this.displayMenuButtons()}
            </Toolbar>
          </AppBar>
        </div>
        <Login theme={this.props.theme} ref={this.loginRef} switchForm={this.switchForm}/>
        <SignUp theme={this.props.theme} ref={this.signUpRef} switchForm={this.switchForm}/>
        <div>
          <CustomBackdrop shouldOpen={this.state.backdrop}/>
        </div>
      </div>
    )
  }
}

export default Appbar;