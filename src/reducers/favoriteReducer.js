import {
  BEGIN_FETCHING_FAVOURITE,
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
  FAVORITE_FETCHED,
  USER_NOT_LOGGED_IN,
} from '../actions/types';

const initialState = {
  favorite: false,
  message: null,
  favorite_failed: false,
  loading: false,
};

export default function favoriteReducer(state = initialState, { type, payload }) {
  const hasLiked = payload === undefined || payload.message === undefined
  || payload.message.favoriting_users === undefined
    ? false
    : payload.message.favoriting_users.lastIndexOf(localStorage.getItem('email')) > -1;
  switch (type) {
    case FAVORITE_CHANGED:
      return {
        ...state,
        favorite_failed: false,
        favorite: undefined === hasLiked ? false : hasLiked,
        loading: false,
        message: undefined === hasLiked || !hasLiked ? 'You have unfavourited this article'
          : 'You have favourited this article',
      };
    case FAVORITE_FAILED:
      return {
        ...state,
        favorite_failed: true,
        favorite: state.favorite,
        loading: false,
        message: 'We are unable to complete your request. Try again later',
      };
    case FAVORITE_FETCHED:
      return {
        ...state,
        favorite_failed: false,
        favorite: payload.favorited,
        loading: false,
        message: payload.favorited ? 'You have already favourited this article'
          : 'You have not favourited this article',
      };
    case USER_NOT_LOGGED_IN:
      return {
        ...state,
        favorite_failed: true,
        message: 'You must login to favourite or unfavourite an article',
        loading: false,
      };
    case BEGIN_FETCHING_FAVOURITE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
