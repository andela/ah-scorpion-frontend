import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import * as fav from '../assets/images/favourite.png';
import * as unfav from '../assets/images/unfavourite.png';
import updateFavorite from '../actions/updateFavorite';
import favoriteReducer from '../reducers/favoriteReducer';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.onUpdateFavourite = this.onUpdateFavourite.bind(this);
  }

  // store = createStore(favoriteReducer);

  onUpdateFavourite() {
    // console.log(this.props);
    this.props.onUpdateFavourite('Samuel Munyili');
  }

  render() {
    return (
      <div className="fav-div">
        <div className="center-item">
          <button onClick={this.onUpdateFavourite} type="button">
            <img alt="" src={this.props.favorite.favorite ? fav : unfav} />
          </button>
        </div>
        Favorite?
        {' '}
        {this.props.favorite.status}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.favorite,
});

const mapActionsToProps = {
  onUpdateFavourite: updateFavorite,
};


export default connect(mapStateToProps, mapActionsToProps)(Favourite);
