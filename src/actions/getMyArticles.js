import axios from 'axios';
import * as types from './types';

export const getMyArticlesBegin = () => ({ type: types.GET_MY_ARTICLES_BEGIN });

export const getMyArticlesSuccess = data => ({ type: types.GET_MY_ARTICLES_SUCCESS, data });

export const getMyArticlesFailure = errorMessage => (
  { type: types.GET_MY_ARTICLES_FAILURE, errorMessage }
);

const getMyUsername = () => localStorage.getItem('username');
const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;

const handleGetMyArticles = () => (dispatch) => {
  dispatch(getMyArticlesBegin());
  axios
    .get(`${articlesUrl}?author__username=${getMyUsername()}`)
    .then(
      (response) => {
        dispatch(getMyArticlesSuccess(response.data));
      },
    )
    .catch(
      () => {
        const errorMessage = 'We could not get your articles at the moment. '
          + 'If the problem persists, please refresh the page or login again';
        dispatch(getMyArticlesFailure(errorMessage));
      },
    );
};

export default handleGetMyArticles;
