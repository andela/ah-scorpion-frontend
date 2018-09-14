import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
  FAVORITE_FETCHED,
  USER_NOT_LOGGED_IN,
} from '../actions/types';

const initialState = {
  favorite: false,
  message: '',
  favorite_failed: false,
};

export default function favoriteReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FAVORITE_CHANGED:
      const hasLiked = payload.message.favoriting_users === undefined ? false
        : payload.message.favoriting_users.lastIndexOf(localStorage.getItem('email')) > -1;
      return {
        ...state,
        favorite_failed: false,
        favorite: hasLiked,
        status: hasLiked ? 'True' : 'False',
        message: payload.message,
      };
    case FAVORITE_FAILED:
      return {
        ...state,
        favorite_failed: false,
        favorite: false,
        status: 'False',
        message: payload.message,
      };
    case FAVORITE_FETCHED:
      return {
        ...state,
        favorite_failed: false,
        favorite: payload.favorited,
        status: 'False',
        message: payload.message,
      };
    case USER_NOT_LOGGED_IN:
      console.log(payload.message);
      return {
        ...state,
        message: payload.message,
        favorite_failed: true,
      };
    default:
      return state;
  }
}
