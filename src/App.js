import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SocialLogin from './containers/SocialLogin';
import SignUp from './containers/Signup';
import Footer from './components/Footer';
import Header from './containers/Header';
import Landing from './components/Landing';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact render={props => <Landing {...props} />} />
          <Route path="/login" exact render={props => <SocialLogin {...props} />} />
          <Route path="/signup" exact render={props => <SignUp {...props} />} />
          <Footer />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
