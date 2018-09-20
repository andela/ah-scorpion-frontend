import React, { Component } from 'react';

import PropTypes from 'prop-types';
import UserNavBar from '../components/UserNavBar';
import Footer from '../components/Footer';
import ArticlesSection from './ArticlesSection';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <UserNavBar history={history} />
        <ArticlesSection />
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
