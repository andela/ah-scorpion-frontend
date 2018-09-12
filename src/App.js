import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import './index.css';
import Homepage from './containers/Homepage';
import ResetForm from './containers/ResetPassword';
import ConfirmPasswordForm from './containers/ConfirmPasswordForm';
import SignUp from './containers/SignUp';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import TextArea from './containers/TextArea';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <Homepage {...props} />} />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      <Route path="/signup" exact render={(props) => <SignUp {...props} />} />
      <Route path="/reset" exact render={(props) => <ResetForm {...props} />} />
      <Route
        path="/api/v1/confirm-password/:token"
        exact
        render={(props) => <ConfirmPasswordForm {...props} />}
      />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/new-article" exact component={TextArea} />
    </Switch>
  </BrowserRouter>
);

export default App;
