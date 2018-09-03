import React from 'react';
import PropTypes from 'prop-types';

const SignupError = ({ errorMsg }) => (
  <div className="alert alert-danger">
    <center>{errorMsg}</center>
  </div>
);

SignupError.propTypes = {
  errorMsg: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

SignupError.defaultProps = {
  errorMsg: null,
};

export default SignupError;
