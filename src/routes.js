import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import ResetForm from "./containers/ResetPassword";
import ConfirmPasswordForm from "./containers/ConfirmPasswordForm";

const Routes = props => (
  <Router {...props}>
    <Switch>
      <Route path={'/'} exact render={(props) => <App {...props} />} />
      <Route path={'/login'} exact render={(props) => <Login {...props} />} />
      <Route path={'/signup'} exact render={(props) => <SignUp {...props} />} />
      <Route path={'/reset'} exact render={(props) => <ResetForm {...props} />} />
      <Route path={'/api/v1/confirm-password/:token'} exact render={(props) => <ConfirmPasswordForm {...props} />} />
    </Switch>
  </Router>
);

export default Routes;
