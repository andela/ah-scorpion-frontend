import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const AfterLoginComponent = () => {
  const username = localStorage.getItem('username');
  const imageUrl = localStorage.getItem('image_url');
  const email = localStorage.getItem('email');
  return (
    <div>
      <NavBar />
      <div className="container p-5 signup-container">
        <h2 style={{ marginTop: '2.3em' }}>
Welcome to your dashboard
          {' '}
          <div className={'text-center'}>{username}</div>
        </h2>
        <img src={imageUrl} alt="Your Profile Photo" />
        <p>
Email:
          {' '}
          {email}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AfterLoginComponent;
