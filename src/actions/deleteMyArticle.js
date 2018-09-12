import axios from 'axios';
import * as types from './types';
import handleGetMyArticles from './getMyArticles';

export const deleteMyArticleBegin = slug => ({ type: types.DELETE_MY_ARTICLE_BEGIN, slug });

export const deleteMyArticleCancel = () => ({ type: types.DELETE_MY_ARTICLE_CANCEL });

export const deleteMyArticleConfirm = () => ({ type: types.DELETE_MY_ARTICLE_CONFIRM });

export const deleteMyArticleSuccess = () => ({ type: types.DELETE_MY_ARTICLE_SUCCESS });

export const deleteMyArticleFailure = errorMessage => (
  { type: types.DELETE_MY_ARTICLE_FAILURE, errorMessage }
);

export const postRequestCleanUp = () => ({ type: types.POST_REQUEST_CLEAN_UP });

const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;
const token = localStorage.getItem('token');

const handleDeleteMyArticle = slug => (dispatch) => {
  dispatch(deleteMyArticleConfirm());
  axios
    .delete(`${articlesUrl}${slug}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      dispatch(deleteMyArticleSuccess());
      dispatch(handleGetMyArticles());
    })
    .catch(() => {
      const errorMessage = 'An error occurred while deleting your article. '
        + 'Please refresh the page or login again.';
      dispatch(deleteMyArticleFailure(errorMessage));
    });
};

export default handleDeleteMyArticle;
