import * as types from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BEGIN_LOGIN:
      state = {
        ...state,
        loading: true,
        message: '',
      };
      break;

    case types.FAIL_LOGIN:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;

    case types.SUCCESS_LOGIN:
      state = {
        ...state,
        isAuthenticated: true,
        message: '',
      };
      break;

    default:
      break;
  }
  return state;
};

export default loginReducer;
