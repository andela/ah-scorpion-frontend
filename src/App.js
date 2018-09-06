import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './containers/Homepage';
import ResetForm from './containers/ResetPassword';
import ConfirmPasswordForm from './containers/ConfirmPasswordForm';
import SignUp from './containers/SignUp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <Homepage {...props} />} />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/signup"
            exact
            render={(props) => <SignUp {...props} />}
          />
          <Route
            path={'/reset'}
            exact
            render={(props) => <ResetForm {...props} />}
          />
          <Route
            path={'/api/v1/confirm-password/:token'}
            exact
            render={(props) => <ConfirmPasswordForm {...props} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
