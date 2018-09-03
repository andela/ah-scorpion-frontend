import React, { Component } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';
import ConfirmEmail from '../components/ConfirmEmail';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { successfulReg: false, error: null };

    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  registerUser = ({ email, username, password }) => {
    const regUrl = 'https://authors-haven-api.herokuapp.com/api/v1/users/signup/';
    let data = { email: email, username: username, password: password };
    axios
      .post(regUrl, data)
      .then(response => (response.status === 201 ? this.setState({ successfulReg: true }) : null))
      .catch(error => {
        let errorMsg = error.response.data.errors;

        if (errorMsg.email) {
          this.setState({ error: errorMsg.email });
        } else if (errorMsg.username) {
          errorMsg.username = errorMsg.username.includes('This field may not be blank.')
            ? 'Please enter a valid username'
            : errorMsg.username;
          this.setState({ error: errorMsg.username });
        } else if (errorMsg.password) {
          errorMsg.password = errorMsg.password.includes('This field may not be blank.')
            ? 'Please enter a valid password'
            : errorMsg.password;
          this.setState({ error: errorMsg.password });
        }
      });
  };

  checkPasswordMatch(password, confPasword) {
    const errorMsg = 'Password and Confirm password should be indentical';
    if (password !== confPasword) {
      this.setState({ error: errorMsg });
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        {this.state.successfulReg ? (
          <ConfirmEmail />
        ) : (
            <SignupForm
              onError={this.state.error !== null}
              errorMsg={this.state.error}
              onSubmit={this.registerUser}
              verifyPassword={this.checkPasswordMatch}
            />
          )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default SignUp;
