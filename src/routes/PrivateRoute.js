import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.string,
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
