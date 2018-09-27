import * as types from './types';
import articleService from '../services/articleService';

export const getMyArticlesBegin = () => ({ type: types.GET_MY_ARTICLES_BEGIN });

export const getMyArticlesSuccess = data => ({ type: types.GET_MY_ARTICLES_SUCCESS, data });

export const getMyArticlesFailure = errorMessage => ({
  type: types.GET_MY_ARTICLES_FAILURE,
  errorMessage,
});

const handleGetMyArticles = (limit, offset) => (dispatch) => {
  dispatch(getMyArticlesBegin());
  articleService
    .getMyArticles(limit, offset)
    .then((object) => {
      if (object.success) {
        dispatch(getMyArticlesSuccess(object.articles.results));
      } else { dispatch(getMyArticlesFailure(object.errorMessage)); }
    });
};

export default handleGetMyArticles;
