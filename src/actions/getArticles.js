import * as types from './types';
import articleService from '../services/articleService';

export const getArticlesBegin = () => ({ type: types.GET_ARTICLES_BEGIN });

export const getArticlesSuccess = data => ({ type: types.GET_ARTICLES_SUCCESS, data });

export const getArticlesFailure = errorMessage => ({
  type: types.GET_ARTICLES_FAILURE,
  errorMessage,
});

const handleGetArticles = () => (dispatch) => {
  dispatch(getArticlesBegin());
  articleService.getArticles().then((object) => {
    if (object.success) {
      dispatch(getArticlesSuccess(object.articles));
    } else {
      dispatch(getArticlesFailure(object.errorMessage));
    }
  });
};

export default handleGetArticles;
