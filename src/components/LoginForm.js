import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from './InlineError';
import SocialLogin from '../containers/SocialLogin';

class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
  });

  onSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'email field required';
    if (!data.password) errors.password = 'password field required';
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <main style={{ marginTop: '2.5em' }}>
        <div className="container p-5 signup-container">
          {errors.error ? (
            <div
              className="alert alert-danger"
              style={{ textAlign: 'center' }}
              role="alert"
            >
              {errors.error[0]}
            </div>
          ) : null}

          <div className="card form-bg">
            <div className="card-header text-center form-bg">
              <h2>Login</h2>
            </div>
            <form className="pt-5 pb-2 px-5 form-bg" onSubmit={this.onSubmit}>
              <SocialLogin />
              <hr />
              <p className="text-center">Or</p>
              <div className="form-group">
                {errors.password && <InlineError text={errors.email} />}
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                  value={data.email}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                {errors.password && <InlineError text={errors.password} />}
                <input
                  className="form-control"
                  type="password"
                  id="InputPassword"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={this.onChange}
                />
                <Link
                  to="/reset"
                  style={{ paddingLeft: '65px', fontSize: '14px' }}
                >
                  Forgot password?
                </Link>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <p>
                  Don
                  {'\''}
                  t have an account? Signup
                  <Link to="/signup"> here </Link>
                </p>
              </div>
              <br />
            </form>
          </div>
        </div>
      </main>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
