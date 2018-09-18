import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import updateFavorite from '../actions/updateFavorite';
import currentUser from '../actions/currentUser';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: 66,
        slug: '',
      },
    };
    this.onUpdateFavourite = this.onUpdateFavourite.bind(this);
    this.getCurrentUser = this.getCurrentUser(this);
  }

  onUpdateFavourite() {
    this.props.onUpdateFavourite(this.props.slug);
  }

  getCurrentUser() {
    this.props.getCurrentUser(this.props.articleId);
  }

  componentDidMount = () => {
    this.setState({ slug: this.props.slug });
  }

  render() {
    return (
      <div className="container fav-div" onReset={this.getCurrentUser}>
        <div className="center-item">
          <h6>Love this article?</h6>
          <button
            disabled={this.props.favorite.loading}
            onClick={this.onUpdateFavourite}
            type="button"
            className="favorite-btn"
          >
            <span
              className={this.props.favorite.favorite ? 'favorite-icon'
                : 'unfavorite-icon'}
            >
&hearts;
            </span>
          </button>
          <ResponseMessage />
        </div>
      </div>
    );
  }
}

const ResponseMessage = () => (
  <div>
    {this.props.favorite.favorite_failed
      ? (
        <p className="alert alert-danger favorite-alert fade-out-text">
          {this.props.favorite.message}
          {' '}
        </p>
      )
      : null}

    {!this.props.favorite.favorite_failed && this.props.favorite.message !== null
      ? (
        <p className="alert alert-success favorite-alert fade-out-text">
          {this.props.favorite.message}
          {' '}
        </p>
      )
      : null}
  </div>
);

const mapStateToProps = state => ({
  favorite: state.favorite,
});

const mapActionsToProps = {
  onUpdateFavourite: updateFavorite,
  getCurrentUser: currentUser,
};

Favourite.propTypes = {
  slug: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(Favourite);
