import React, { Component } from 'react';

import PropTypes from 'prop-types';
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
        <UserNavBar history={this.props.history} />
        <DashboardContainer />
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Dashboard;
