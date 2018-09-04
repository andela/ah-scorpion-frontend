import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUp from './containers/SignUp';
import Homepage from './containers/Homepage';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact render={props => <SignUp {...props} />} />
          <Route path="/" exact render={props => <Homepage {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
