import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateFavorite from '../actions/updateFavorite';
import currentUser from '../actions/currentUser';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: 66,
        slug: 'food-is-the-best-1553a1f0baf94cc1b74ca4b8f80781d6',
      },
    };
    this.onUpdateFavourite = this.onUpdateFavourite.bind(this);
    this.getCurrentUser = this.getCurrentUser(this);
  }


  onUpdateFavourite() {
    this.props.onUpdateFavourite(this.state.article.slug);
  }

  getCurrentUser() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="container fav-div" onReset={this.getCurrentUser}>
        <div className="center-item">
          <h3><b>This is the title of the article</b></h3>
        <div className="article-body">
          <p>
            Imagine this is an LMS output, would you still favourite it?
          </p>
          <p>
            But, before I spoil your day, this is not LMS or anything to do with that. It is something else. Never mind what, just something else.
            Now will you favourite it?
          </p>
          <p>
            If so click the heart below to heart it. Aha.
          </p>
        </div>
          <button onClick={this.onUpdateFavourite} type="button" className="favorite-btn">
            <span
              className={this.props.favorite.favorite ? 'favorite-icon'
                : 'unfavorite-icon'}
            >
&hearts;
            </span>
          </button>

          {this.props.favorite.favorite_failed
            ? (
              <p className="alert alert-danger favorite-error">
                {this.props.favorite.message}
                {' '}
              </p>
            )
            : null}
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
  getCurrentUser: currentUser,
};


export default connect(mapStateToProps, mapActionsToProps)(Favourite);
