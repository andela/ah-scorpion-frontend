import React from 'react';
import PropTypes from 'prop-types';

const SignupError = ({ errorMessage }) => (
  <div className="alert alert-danger" style={{ marginTop: '30px' }}>
    <center>{errorMessage}</center>
  </div>
);

SignupError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default SignupError;
