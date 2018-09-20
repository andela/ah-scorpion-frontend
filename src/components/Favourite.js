import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import updateFavorite from '../actions/updateFavorite';
import currentUser from '../actions/currentUser';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onUpdateFavourite = this.onUpdateFavourite.bind(this);
    this.getCurrentUser = this.getCurrentUser(this);
  }

  onUpdateFavourite() {
    const { onUpdateFavourite, slug } = this.props;
    onUpdateFavourite(slug);
  }

  getCurrentUser() {
    const { getCurrentUser, articleId } = this.props;
    getCurrentUser(articleId);
  }

  componentDidMount = () => {
    const { slug } = this.props;
    this.setState({ slug });
  };

  render() {
    const { favorite } = this.props;
    return (
      <div className="container fav-div" onReset={this.getCurrentUser}>
        <div className="center-item">
          <h6>Love this article?</h6>
          <button
            disabled={favorite.loading}
            onClick={this.onUpdateFavourite}
            type="button"
            className="favorite-btn"
          >
            <span className={favorite.favorite ? 'favorite-icon' : 'unfavorite-icon'}>
              &hearts;
            </span>
          </button>
          <div>
            {favorite.favorite_failed ? (
              <p className="alert alert-danger favorite-alert ">
                {favorite.message}
                {' '}
              </p>
            ) : null}

            {!favorite.favorite_failed && favorite.message !== null ? (
              <p className="alert alert-success favorite-alert">
                {favorite.message}
                {' '}
              </p>
            ) : null}
          </div>
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

Favourite.propTypes = {
  slug: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,
  onUpdateFavourite: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  favorite: PropTypes.shape().isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Favourite);
