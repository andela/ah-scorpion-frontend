import * as types from './types';
import articleService from '../services/articleService';

export const getMyArticlesBegin = () => ({ type: types.GET_MY_ARTICLES_BEGIN });

export const getMyArticlesSuccess = data => ({ type: types.GET_MY_ARTICLES_SUCCESS, data });

export const getMyArticlesFailure = errorMessage => (
  { type: types.GET_MY_ARTICLES_FAILURE, errorMessage }
);

const handleGetMyArticles = () => (dispatch) => {
  dispatch(getMyArticlesBegin());
  articleService
    .getMyArticles()
    .then(
      (articles) => {
        dispatch(getMyArticlesSuccess(articles));
      },
    )
    .catch(
      (errorMessage) => {
        dispatch(getMyArticlesFailure(errorMessage));
      },
    );
};

export default handleGetMyArticles;
