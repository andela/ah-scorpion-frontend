import React, { Component } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';
import ConfirmEmail from '../components/ConfirmEmail';
import SignupError from '../components/SignupError';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { successfulReg: false };
    this.error = null;
  }

  registerUser = user => {
    const regUrl = 'https://authors-haven-api.herokuapp.com/api/v1/users/signup/';
    let data = { email: user.email, username: user.username, password: user.password };
    axios
      .post(regUrl, data)
      .then(
        response =>
          response.status === 201
            ? this.setState({ successfulReg: true })
            : console.log(response.status),
    )
      .catch(error => {
        const errorMessage = error.response.data.errors;
        errorMessage.email !== undefined
          ? this.setState({ successfulReg: false, error: errorMessage.email })
          : errorMessage.username !== undefined
            ? this.setState({ successfulReg: false, error: errorMessage.username })
            : errorMessage.password !== undefined
              ? this.setState({ successfulReg: false, error: errorMessage.password })
              : this.setState({ successfulReg: true, error: null })
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        {this.state.error !== null ? (<div><br /><br /><br />
          <SignupError errorMessage={this.state.error} /> </div>) : ""}
        {this.state.successfulReg ? <ConfirmEmail /> : <SignupForm 
        state={{ username: "Samuel Munyili" }} 
        onSubmit={this.registerUser} />}
        <Footer />
      </React.Fragment>
    );
  }
}

export default SignUp;
