import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SignupForm extends Component {
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
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit(this.state);
  }

  render() {
    const {
      email, username, password, confPassword,
    } = this.state;
    return (
      <main className="mt-2em">
        <div className="container p-5 signup-container">
          <div className="card  form-bg ptb-1em">
            <div className="card-header text-center form-bg">
              <h2>Sign Up</h2>
            </div>
            <form className="pb-5 pl-5 pr-5 pt-0 form-bg" onSubmit={this.handleSubmit}>
              <div className="text-center">
                <p>You could sign up with...</p>
                <Link to="#facebbok">
                  <button className="btn btn-primary social-btn" type="button">
                    <div>
                      <i className="fa fa-facebook fa-2x" aria-hidden="true" />
                    </div>
                  </button>
                </Link>
                <Link to="#google">
                  <button className="btn btn-danger social-btn" type="button">
                    <div>
                      <i className="fa fa-google fa-2x" aria-hidden="true" />
                    </div>
                  </button>
                </Link>
                <br />
                <p className="mt-2em">Or</p>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
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
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                  name="confPassword"
                  value={confPassword}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <p>
                  Already have an account? Login
                  <Link to="login"> here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
