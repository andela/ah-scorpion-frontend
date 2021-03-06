import * as types from '../actions/types';

const initialState = {
  success: false,
  error: {},
  failure: false,
  isFetching: false,
};

const signUpReducer = (state = initialState, action) => {
  const { error, type } = action;
  switch (type) {
    case types.SIGNUP_REQUEST:
      return { ...state, isFetching: true };

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        success: true,
        isFetching: false,
        error: {},
        failure: false,
      };

    case types.SIGNUP_ERROR:
      return {
        ...state,
        success: false,
        isFetching: false,
        failure: true,
        error,
      };

    default:
      return state;
  }
};

export default signUpReducer;
