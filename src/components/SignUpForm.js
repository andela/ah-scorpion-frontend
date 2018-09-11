import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignUpError from './SignUpError';
import SocialLogin from '../containers/SocialLogin';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confPassword: '',
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit, verifyPassword } = this.props;
    const { password, confPassword } = this.state;
    if (verifyPassword(password, confPassword)) {
      onSubmit(this.state);
    }
  }

  render() {
    const {
      onError, errorMsg, isFetching, history,
    } = this.props;
    const {
      email, username, password, confPassword,
    } = this.state;
    return (
      <main className="mt-2em">
        <div className="container p-5 signup-container">
          {onError ? <SignUpError errorMsg={errorMsg} /> : null}
          <div className="card  form-bg ptb-1em">
            <div className="card-header text-center form-bg">
              <h2>Sign Up</h2>
            </div>
            <form className="pb-5 pl-5 pr-5 pt-0 form-bg" onSubmit={this.handleSubmit}>
              <div className="text-center">
                <p>You could sign up with...</p>
                <SocialLogin history={history} />
                <hr />
                <p className="mt-2em">Or</p>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  required
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  required
                  className="form-control"
                  id="exampleInputUsername"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  required
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  required
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                  name="confPassword"
                  value={confPassword}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  id="submitButton"
                  className="btn btn-primary"
                  disabled={isFetching}
                >
                  {isFetching ? 'Loading...' : 'Sign Up'}
                </button>
                <p>
                  Already have an account? Login
                  <Link to="/login"> here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMsg: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
    PropTypes.string,
  ]),
  verifyPassword: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

SignUpForm.defaultProps = {
  errorMsg: null,
};

export default SignUpForm;
