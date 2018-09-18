import * as types from '../actions/types';

const initialState = {
  loading: false,
  payload: {},
  success: false,
  failure: false,
  errors: null,
};

const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ARTICLE_CREATE:
      return { ...state, loading: true };
    case types.ARTICLE_FAILURE:
      return {
        ...state,
        payload: '',
        success: false,
        failure: true,
        errors: action.errors,
        loading: false,
      };
    case types.ARTICLE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        success: true,
        failure: false,
        errors: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default createArticleReducer;
