import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
} from '../actions/types';

const initialState = {
  favorite: false,
  message: '',
};

export default function favoriteReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FAVORITE_CHANGED:
      const hasLiked = payload.message.favoriting_users === undefined ? false
        : payload.message.favoriting_users.lastIndexOf('samuel.munyili@andela.com') > -1;
      return {
        ...state,
        favorite: hasLiked,
        status: hasLiked ? 'True' : 'False',
        message: payload.message,
      };
    case FAVORITE_FAILED:
      console.log(payload.message);
      return {
        ...state,
        favorite: false,
        status: 'False',
        message: payload.message,
      };
    default:
      return state;
  }
}
