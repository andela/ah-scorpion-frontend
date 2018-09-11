import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import changePassword from '../actions/resetPassword';

class ResetForm extends Component {
  state = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, match } = this.props;
    dispatch(
      changePassword({
        ...this.state,
        reset_token: match.params.token,
      }),
    );
  };

  validatePassword = () => {
    const { confirmPassword, newPassword } = this.state;
    return confirmPassword === newPassword;
  };

  renderForm = () => {
    const { reset } = this.props;
    const { email, confirmPassword, newPassword } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <main style={{ marginTop: '2.5em' }}>
          <div className="container p-5 signup-container">
            {reset.errors.error ? (
              <div
                className="alert alert-danger"
                style={{ textAlign: 'center' }}
                role="alert"
              >
                {reset.errors.error[0]}
              </div>
            ) : null}

            <div className="card form-bg">
              <div className="card-header text-center form-bg">
                <h2>Change Password</h2>
              </div>
              <form
                className="pt-5 pb-2 px-5 form-bg"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <input
                    required
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    required
                    type="Password"
                    className="form-control"
                    name="newPassword"
                    placeholder="Password"
                    value={newPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <br />

                <div className="form-group">
                  <input
                    required
                    type="Password"
                    className={`form-control ${
                      this.validatePassword() ? '' : 'is-invalid'
                    }`}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback text-center ">
                  Passwords do not match
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={reset.sending}
                  >
                    {reset.sending ? 'Sending...' : 'Submit'}
                  </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  };

  render() {
    const { reset, history } = this.props;
    return (
      <div>
        {reset.sent
          ? history.push('/login')
          : this.renderForm()}
      </div>
    );
  }
}

ResetForm.propTypes = {
  reset: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  dispatch: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  reset: state.reset,
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
});

ResetForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps)(ResetForm);
