import React, { Component } from 'react';
import UserNavBar from '../components/UserNavBar';
import ProfilePage from '../components/ProfilePage';
import Footer from '../components/Footer';

export default class Profile extends Component {
  render() {
    return (
      <div>

        <ProfilePage />
        <Footer />
      </div>
    );
  }
}
