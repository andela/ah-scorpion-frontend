import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
  FAVORITE_FETCHED,
  USER_NOT_LOGGED_IN,
} from '../actions/types';

const initialState = {
  favorite: false,
  message: null,
  favorite_failed: false,
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
        message: undefined === hasLiked || !hasLiked ? 'You have unfavourited this article'
          : 'You have favourited this article',
      };
    case FAVORITE_FAILED:
      return {
        ...state,
        favorite_failed: true,
        favorite: state.favorite,
        message: 'We are unable to complete your request. Try again later',
      };
    case FAVORITE_FETCHED:
      return {
        ...state,
        favorite_failed: false,
        favorite: payload.favorited,
        message: payload.favorited ? 'You have already favourited this article'
          : 'You have not favourited this article',
      };
    case USER_NOT_LOGGED_IN:
      return {
        ...state,
        message: 'You must login to favourite or unfavourite an article',
        favorite_failed: true,
      };
    default:
      return state;
  }
}
