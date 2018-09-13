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
      return {
        ...state,
        favorite: !state.favorite,
        status: state.favorite ? 'True' : 'False',
        message: payload.message,
      };
    case FAVORITE_FAILED:
      console.log(payload.message);
      return {
        ...state,
        favorite: state.favorite,
        status: state.favorite ? 'True' : 'False',
        message: payload.message,
      };
    default:
      return state;
  }
}
