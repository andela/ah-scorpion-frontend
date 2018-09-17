import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import Login from './containers/Login';
import './index.css';
import 'draft-js/dist/Draft.css';
import Homepage from './containers/Homepage';
import ResetForm from './containers/ResetPassword';
import ConfirmPasswordForm from './containers/ConfirmPasswordForm';
import SignUp from './containers/SignUp';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Favourite from './containers/Favourite';
import TextArea from './containers/TextArea';
import RenderArticle from './containers/RenderArticle';
import Article from './containers/Article';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Homepage {...props} />} />
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/signup" exact render={props => <SignUp {...props} />} />
      <Route path="/reset" exact render={props => <ResetForm {...props} />} />
      <Route path="/favourite" exact render={props => <Favourite {...props} />} />
      <Route
        path="/api/v1/confirm-password/:token"
        exact
        render={props => <ConfirmPasswordForm {...props} />}
      />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/article/new" exact component={TextArea} />
      <Route path="/article/:slug" exact component={RenderArticle} />
      <Route path="/new-article" exact component={TextArea} />
      <Route path="/read" exact component={RenderArticle} />
      <Route path="/article-ex" exact render={props => <Article {...props} />} />
    </Switch>
  </BrowserRouter>
);

export default App;
