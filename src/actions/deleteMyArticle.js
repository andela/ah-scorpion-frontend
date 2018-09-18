import * as types from './types';
import handleGetMyArticles from './getMyArticles';
import articleService from '../services/articleService';

export const deleteMyArticleBegin = slug => ({ type: types.DELETE_MY_ARTICLE_BEGIN, slug });

export const deleteMyArticleCancel = () => ({ type: types.DELETE_MY_ARTICLE_CANCEL });

export const deleteMyArticleConfirm = () => ({ type: types.DELETE_MY_ARTICLE_CONFIRM });

export const deleteMyArticleSuccess = () => ({ type: types.DELETE_MY_ARTICLE_SUCCESS });

export const deleteMyArticleFailure = errorMessage => (
  { type: types.DELETE_MY_ARTICLE_FAILURE, errorMessage }
);

export const postRequestCleanUp = () => ({ type: types.POST_REQUEST_CLEAN_UP });

const handleDeleteMyArticle = slug => (dispatch) => {
  dispatch(deleteMyArticleConfirm());
  articleService.deleteMyArticle(slug)
    .then((object) => {
      if (object.success) {
        dispatch(deleteMyArticleSuccess());
        dispatch(handleGetMyArticles());
      } else { dispatch(deleteMyArticleFailure(object.errorMessage)); }
    });
};

export default handleDeleteMyArticle;
