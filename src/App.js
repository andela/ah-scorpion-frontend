import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './containers/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
