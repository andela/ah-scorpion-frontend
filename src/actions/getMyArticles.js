import axios from 'axios';
import * as types from './types';

export const getMyArticlesBegin = () => ({ type: types.GET_MY_ARTICLES_BEGIN });

export const getMyArticlesSuccess = data => ({ type: types.GET_MY_ARTICLES_SUCCESS, data });

export const getMyArticlesFailure = errors => ({ type: types.GET_MY_ARTICLES_FAILURE, errors });

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
      (error) => {
        dispatch(getMyArticlesFailure(error.data));
      },
    );
};

export default handleGetMyArticles;
