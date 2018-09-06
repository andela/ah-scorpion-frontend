// Here we have a "smart" component which is aware of Redux
import React from 'react';
import Footer from '../components/Footer';

const login = () => {
  return (
    <div>
      <h1>This is the login page</h1>
      <Footer />
    </div>
  );
};

export default login;
