import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import * as actions from '../actions';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const fbAppId = process.env.REACT_APP_FACEBOOK_APP_ID;


class SocialLogin extends Component {
  constructor({
    SOCIALAUTH, isAuthenticated, message, loading,
  }) {
    super({
      SOCIALAUTH, isAuthenticated, message, loading,
    });
    this.state = {};

    this.googleResponse = this.googleResponse.bind(this);
    this.facebookResponse = this.facebookResponse.bind(this);
    this.socialAuthResponse = this.socialAuthResponse.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onFailure(error) {
    console.log(error);
  }

  googleResponse(response) {
    this.socialAuthResponse(response.accessToken, 'google-oauth2');
  }

  facebookResponse(response) {
    this.socialAuthResponse(response.accessToken, 'facebook');
  }

  socialAuthResponse(token, provider) {
    // the request body format
    const requestBody = {
      access_token: token,
      provider,
    };
    this.SOCIALAUTH(requestBody);
  }

  render() {
    return (
      <div className="text-center">
        <FacebookLogin
          appId={fbAppId}
          autoLoad
          fields="name,email,picture"
          callback={this.facebookResponse}
          cssClass="btn btn-primary"
          icon="fa fa-facebook fa-2x"
          textButton=""
        />

        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
    );
  }
}
SocialLogin.propTypes = {
  SOCIALAUTH: PropTypes.func.isRequired,
};

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
