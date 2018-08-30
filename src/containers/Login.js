// Here we have a "smart" component which is aware of Redux
import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import keys from '../config/keys';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  onFailure(error) {
    console.log(error);
  }

  logout() {
    this.setState({ isAuthenticated: false, token: '', user: null });
  }

  googleResponse(response) {
    console.log(response);
  }

  render() {
    const content = this.state.isAuthenticated
      ? (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button type="button" onClick={this.logout} className="button">
              Log out
            </button>
          </div>
        </div>
      )
      : (
        <div>
          <GoogleLogin
            clientId={keys.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default Login;
