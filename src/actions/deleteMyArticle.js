import axios from 'axios';
import * as types from './types';

export const deleteMyArticleBegin = slug => ({ type: types.DELETE_MY_ARTICLE_BEGIN, slug });

export const deleteMyArticleCancel = () => ({ type: types.DELETE_MY_ARTICLE_CANCEL });

export const deleteMyArticleConfirm = () => ({ type: types.DELETE_MY_ARTICLE_CONFIRM });

export const deleteMyArticleSuccess = () => ({ type: types.DELETE_MY_ARTICLE_SUCCESS });

export const deleteMyArticleFailure = errors => ({ type: types.DELETE_MY_ARTICLE_FAILURE, errors });

export const deleteMyArticlePostFailure = () => ({ type: types.DELETE_MY_ARTICLE_POST_FAILURE });

const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;

const handleDeleteMyArticle = slug => (dispatch) => {
  dispatch(deleteMyArticleConfirm());
  axios
    .delete(`${articlesUrl}${slug}`)
    .then(
      () => {
        dispatch(deleteMyArticleSuccess());
      },
    )
    .catch(
      () => {
        const errorMessage = 'An error occurred while deleting your article. '
          + 'Please refresh the page or login again.';
        dispatch(deleteMyArticleFailure(errorMessage));
        setTimeout(() => dispatch(deleteMyArticlePostFailure()), 3000);
      },
    );
};

export default handleDeleteMyArticle;
