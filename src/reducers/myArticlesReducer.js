import * as types from '../actions/types';

const initialState = {
  isFetching: false,
  isDeleting: false,
  fetchSuccess: false,
  fetchFailure: false,
  deleteSuccess: false,
  deleteFailure: false,
  articles: [],
  error: '',
  deletedArticleSlug: '',
};

const myArticlesReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.GET_MY_ARTICLES_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_MY_ARTICLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: true,
        articles: action.data,
      };
    case types.GET_MY_ARTICLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchFailure: true,
        errors: action.errors,
      };
    case types.DELETE_MY_ARTICLE_BEGIN:
      return {
        ...state,
        deletedArticleSlug: action.slug,
      };
    case types.DELETE_MY_ARTICLE_CANCEL:
      return {
        ...state,
        deletedArticleSlug: '',
      };
    case types.DELETE_MY_ARTICLE_CONFIRM:
      return {
        ...state,
        isDeleting: true,
      };
    case types.DELETE_MY_ARTICLE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteSuccess: true,
        deletedArticleSlug: action.slug,
        deleteFailure: false,
      };
    case types.DELETE_MY_ARTICLE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        deleteFailure: true,
        error: action.error,
        deleteSuccess: false,
      };
    case types.DELETE_MY_ARTICLE_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isDeleting: false,
        fetchSuccess: false,
        fetchFailure: false,
        deleteSuccess: false,
        deleteFailure: false,
        error: '',
      };
    default:
      return state;
  }
};

export default myArticlesReducer;
