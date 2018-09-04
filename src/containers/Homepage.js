import React, { Component } from 'react';

import Home from '../components/Home';
import HomeFooter from '../components/HomeFooter';

class Homepage extends Component {
  render() {
    return (
      <React.Fragment>
        <Home />
        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default Homepage;
