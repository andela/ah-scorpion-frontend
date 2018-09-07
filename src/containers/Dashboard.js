import React, { Component } from 'react';

import UserNavBar from '../components/UserNavBar';
import Footer from '../components/Footer';
import DashboardContainer from '../components/DashnoardContainer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <UserNavBar />
        <DashboardContainer />
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
