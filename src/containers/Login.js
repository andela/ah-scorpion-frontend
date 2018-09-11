import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import LoginForm from '../components/LoginForm';
import { login } from '../actions/auth';

class Login extends Component {
  submit = data => this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <NavBar />
        <LoginForm submit={this.submit} history={history} />
        <Footer />
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  null,
  { login },
)(Login);
