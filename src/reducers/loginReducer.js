import * as types from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BEGIN_LOGIN:
      return {
        ...state,
        loading: true,
        message: '',
      };

    case types.FAIL_LOGIN:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case types.SUCCESS_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        message: '',
      };

    default:
      return state;
  }
};

export default loginReducer;
