import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateFavorite from '../actions/updateFavorite';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.onUpdateFavourite = this.onUpdateFavourite.bind(this);
  }


  onUpdateFavourite() {
    console.log(window.location.href);
    this.props.onUpdateFavourite();
  }

  componentDidMount() {
    return this.onUpdateFavourite();
  }

  render() {
    return (
      <div className="fav-div" onReset={this.onUpdateFavourite}>
        <div className="center-item">
          <h3>This is the title of the Article</h3>
          <p>
            Imagine this is an LMS output, would you still favourite it?
          </p>
          <button onClick={this.onUpdateFavourite} type="button" className="favorite-btn">
            <span
              className={this.props.favorite.favorite ? 'favorite-icon'
                : 'unfavorite-icon'}
            >
&hearts;
            </span>
          </button>
        </div>
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
