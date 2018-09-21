import * as types from '../actions/types';

export const initialState = {
  isFetching: false,
  fetchSuccess: false,
  fetchFailure: false,
  articles: [],
  errorMessage: '',
};

const articlesReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.GET_ARTICLES_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: true,
        articles: action.data,
      };
    case types.GET_ARTICLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchFailure: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default articlesReducer;
