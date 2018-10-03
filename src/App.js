import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import Login from './containers/Login';
import './index.css';
import Homepage from './containers/Homepage';
import ResetForm from './containers/ResetPassword';
import ConfirmPasswordForm from './containers/ConfirmPasswordForm';
import SignUp from './containers/SignUp';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import TextArea from './containers/TextArea';
import RenderArticle from './containers/RenderArticle';
import MyArticlesPage from './containers/MyArticlesPage';
import EditMyArticle from './containers/EditMyArticle';
import Profile from './containers/Profile';
import EditProfile from './components/EditProfile';
import Favourite from './components/Favourite';

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
      <PrivateRoute path="/my-articles" component={MyArticlesPage} />
      <PrivateRoute path="/article/new" exact component={TextArea} />
      <PrivateRoute path="/article/:slug/edit" exact component={EditMyArticle} />
      <Route path="/article/:slug" exact component={RenderArticle} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/edit" exact component={EditProfile} />
} />
    </Switch>
  </BrowserRouter>
);

export default App;
