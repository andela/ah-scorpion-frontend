import React, { Component } from 'react';

import Home from '../components/Home';
import HomeFooter from '../components/HomeFooter';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Home />
        <HomeFooter />
      </div>
    );
  }
}

export default Homepage;
