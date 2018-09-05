import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import HomeFooter from '../components/HomeFooter';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div suppressContentEditableWarning>
          <Home />
          <HomeFooter />
        </div>
      </BrowserRouter>
    );
  }
}

export default Homepage;
