import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: "",
      password: "",
      passwordConfirm: "",
      errors: "",
      hideProgress: true
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleOpen(event) {
    this.setState({ open: true });
  }

  handleClose(event) {
    this.setState({ open: false });
    this.setState({ errors: "" });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async handleSignUp(event) {
    const { email, password, passwordConfirm } = this.state;
    if (password.toString() === passwordConfirm.toString()) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          this.setState({ hideProgress: false });
          this.setState({ open: false });
          this.setState({ hideProgress: true });
        })
        .catch((error) => {
          this.setState({ errors: error.message });
        });
    } else {
      this.setState({ errors: "Passwords do not match" }); 
    }
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign up to keep track of your favorite animes and mangas, get personalized recommendations and more!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            margin="dense"
            id="passwordConfirm"
            label="Password Confirmation"
            type="password"
            fullWidth
            onChange={this.handleChange}
          />
          <div style={{textAlign: "center"}}>
            <p style={{ color: "#747474"}}>
              Already have an account?
              <Button onClick={event => this.props.switchForm(event, "login")} style={{ padding: 0 }} color="primary" >Login</Button>
            </p>
          </div>
          <p style={{ color: "#E97979" }}>{this.state.errors}</p>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSignUp} color="primary" variant="contained">
          Sign Up
        </Button>
        </DialogActions>
        <div hidden={this.state.hideProgress} style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      </Dialog>
    );
  }
}
