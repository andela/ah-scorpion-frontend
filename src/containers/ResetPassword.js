import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import resetAction from '../actions/resetAction';

class ResetForm extends Component {
  state = {
    email: '',
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    const { email } = this.state;
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(resetAction(email));
  };

  renderForm = () => {
    const { email } = this.state;
    const { reset } = this.props;
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
                <h2>Password Reset</h2>
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

  renderSuccess = () => (
    <main style={{ marginTop: '2.5em' }}>
      <div className="container p-5 signup-container">
        <div
          className="alert alert-success"
          style={{ textAlign: 'center' }}
          role="alert"
        >
          <p>Please Check Your Email For Further Instructions</p>
        </div>
      </div>
    </main>
  );

  render() {
    const { reset } = this.props;
    return <div>{reset.sent ? this.renderSuccess() : this.renderForm()}</div>;
  }
}

ResetForm.propTypes = {
  dispatch: PropTypes.shape().isRequired,
  reset: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  reset: state.reset,
});

export default connect(mapStateToProps)(ResetForm);
