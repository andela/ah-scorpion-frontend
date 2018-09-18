import * as types from '../actions/types';

export const initialState = {
  isFetching: false,
  isSubmitting: false,
  fetchSuccess: false,
  fetchFailure: false,
  submitSuccess: false,
  submitFailure: false,
  article: {},
  errorMessage: '',
};

const editMyArticleReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.GET_ONE_ARTICLE_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ONE_ARTICLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: true,
        article: action.data,
      };
    case types.GET_ONE_ARTICLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchFailure: true,
        errorMessage: action.errorMessage,
      };
    case types.EDIT_MY_ARTICLE_BEGIN:
      return {
        ...state,
        deletedArticleSlug: action.slug,
      };
    case types.EDIT_MY_ARTICLE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteSuccess: true,
        deletedArticleSlug: '',
        deleteFailure: false,
      };
    case types.EDIT_MY_ARTICLE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        deleteFailure: true,
        errorMessage: action.errorMessage,
        deleteSuccess: false,
      };
    case types.POST_REQUEST_CLEAN_UP:
      return {
        ...state,
        isFetching: false,
        isDeleting: false,
        fetchSuccess: false,
        fetchFailure: false,
        deleteSuccess: false,
        deleteFailure: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default editMyArticleReducer;
