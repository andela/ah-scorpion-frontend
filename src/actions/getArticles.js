import * as types from './types';
import articleService from '../services/articleService';

export const getArticlesBegin = () => ({ type: types.GET_ARTICLES_BEGIN });

export const getArticlesSuccess = data => ({ type: types.GET_ARTICLES_SUCCESS, data });

export const getArticlesFailure = errorMessage => ({
  type: types.GET_ARTICLES_FAILURE,
  errorMessage,
});

const handleGetArticles = (limit, offset) => (dispatch) => {
  dispatch(getArticlesBegin());
  articleService.getArticles(limit, offset).then((object) => {
    if (object.success) {
      dispatch(getArticlesSuccess(object.articles.results));
    } else {
      dispatch(getArticlesFailure(object.errorMessage));
    }
  });
};

export default handleGetArticles;
