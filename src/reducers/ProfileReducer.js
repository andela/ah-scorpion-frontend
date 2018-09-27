import { GET_USER_PROFILE, EDIT_USER_PROFILE, PROFILE_ERROR } from '../actions/types';

export default function account(state = {}, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, profile: action.payload };
    case EDIT_USER_PROFILE:
      console.log('reducer', action.payload);
      return { ...state, profile: action.payload };
    case PROFILE_ERROR:
      console.log('weeoer', action.payload);

      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
