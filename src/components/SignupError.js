import React from 'react';
import PropTypes from 'prop-types';

const SignUpError = ({ errorMsg }) => (
  <div className="alert alert-danger">
    <center>{errorMsg}</center>
  </div>
);

SignUpError.propTypes = {
  errorMsg: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

SignUpError.defaultProps = {
  errorMsg: null,
};

export default SignUpError;
