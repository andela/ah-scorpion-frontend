import * as types from './types';
import articleService from '../services/articleService';

export const getOneArticleBegin = () => ({ type: types.GET_ONE_ARTICLE_BEGIN });

export const getOneArticleSuccess = data => ({ type: types.GET_ONE_ARTICLE_SUCCESS, data });

export const getOneArticleFailure = errorMessage => ({
  type: types.GET_ONE_ARTICLE_FAILURE,
  errorMessage,
});

const handleGetOneArticle = slug => (dispatch) => {
  dispatch(getOneArticleBegin());
  articleService
    .getOneArticle(slug)
    .then((object) => {
      if (object.success) {
        dispatch(getOneArticleSuccess(object.article));
      } else { dispatch(getOneArticleFailure(object.errorMessage)); }
    });
};

export default handleGetOneArticle;
