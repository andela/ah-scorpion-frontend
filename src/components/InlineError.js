import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => (
  <span style={{ color: '#d63645', paddingLeft: '65px' }}>{text}</span>
);
InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};
export default InlineError;
