// Here we have a "smart" component which is aware of Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import * as actions from '../actions';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.googleResponse = this.googleResponse.bind(this);
    this.socialAuthResponse = this.socialAuthResponse.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.logout = this.logout.bind(this);
  }

  onFailure(error) {
    console.log(error);
  }

  logout() {
    this.setState({ isAuthenticated: false, token: '', user: null });
  }

  googleResponse(response) {
    this.socialAuthResponse(response.accessToken, 'google-oauth2');
  }

  socialAuthResponse(token, provider) {
    // the request body format
    const requestBody = {
      access_token: token,
      provider,
    };
    this.props.SOCIALAUTH(requestBody);
  }

  render() {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={this.googleResponse}
        onFailure={this.onFailure}
      />
    );
  }
}

const mapStateToProps = ({ authState }) => ({
  isAuthenticated: authState.isAuthenticated,
  message: authState.message,
  loading: authState.loading,
});


const mapDispatchToProps = dispatch => ({
  // Create the loginUser function that executes functions for login
  SOCIALAUTH: data => dispatch(actions.socialLogin(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);
