import React, { Component } from 'react';

import NavBar from '../components/NavBar';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <SignupForm />
        <Footer />
      </React.Fragment>
    );
  }
}

export default SignUp;
