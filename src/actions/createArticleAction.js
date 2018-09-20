import axios from 'axios';
import * as types from './types';

const baseUrl = process.env.REACT_APP_BASE_URL;
const createUrl = `${baseUrl}/articles/`;
const getMyToken = () => window.localStorage.getItem('token');

export const articleFetch = () => ({
  type: types.ARTICLE_CREATE,
});

export const articleSuccess = (payload) => ({
  type: types.ARTICLE_SUCCESS,
  payload,
});

export const articleFailure = (errors) => ({
  type: types.ARTICLE_FAILURE,
  errors,
});

const createArticleAction = (data, history) => (dispatch) => {
  dispatch(articleFetch());
  return axios
    .post(createUrl, data, {
      headers: { Authorization: `Bearer ${getMyToken()}` },
    })
    .then((res) => {
      dispatch(articleSuccess(res));
      window.localStorage.setItem('slug', res.data.slug);

      history.push('/my-articles');
    })
    .catch((error) => {
      dispatch(articleFailure(error));
    });
};

export default createArticleAction;
