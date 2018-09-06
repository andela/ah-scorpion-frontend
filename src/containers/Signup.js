import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from '../components/NavBar';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';
import ConfirmEmail from '../components/ConfirmEmail';
import { handleUserRegistration, signUpError } from '../actions/signUp';

const SignUp = ({
  dispatch, success, failure, error, isFetching,
}) => {
  const registerUser = ({ email, username, password }) => {
    const userInfo = { email, username, password };
    dispatch(handleUserRegistration(userInfo));
  };

  const checkPasswordMatch = (password, confPasword) => {
    const errorMsg = 'Password and Confirm password should be indentical';
    if (password !== confPasword) {
      dispatch(signUpError(errorMsg));
      return false;
    }
    return true;
  };

  return (
    <React.Fragment>
      <NavBar />
      {success ? (
        <ConfirmEmail />
      ) : (
        <SignUpForm
          onError={failure}
          errorMsg={error}
          onSubmit={registerUser}
          verifyPassword={checkPasswordMatch}
          isFetching={isFetching}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
    PropTypes.string,
  ]),
};

SignUp.defaultProps = {
  error: null,
};

const mapStateToProps = ({ signup }) => signup;

export default connect(mapStateToProps)(SignUp);
