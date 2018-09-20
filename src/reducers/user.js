import { USER_LOGGED_IN, USER_NOT_LOGGED_IN } from '../actions/types';

const initialState = {
  user_logged: true,
};
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_NOT_LOGGED_IN:
      return {
        ...state,
        user_logged: false,
      };
    default:
      return state;
  }
}
