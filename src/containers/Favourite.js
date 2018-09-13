import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Fav from '../components/Favourite';
import Footer from '../components/Footer';


class Favourite extends Component {
  render() {
    // const { history } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <Fav />
        <Footer />
      </React.Fragment>
    );
  }
}


export default Favourite;
