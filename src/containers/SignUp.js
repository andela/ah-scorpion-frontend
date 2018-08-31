import React, { Component } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  registerUser = user => {
    const regUrl = 'https://authors-haven-api.herokuapp.com/api/v1/users/signup/';
    let data = { email: user.email, username: user.username, password: user.password };
    axios
      .post(regUrl, data)
      .then(response => console.log(response.data))
      .catch(error => {
        const errorMessage = error.response.data.errors.errors;
        console.log(errorMessage);
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <SignupForm onSubmit={this.registerUser} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default SignUp;
