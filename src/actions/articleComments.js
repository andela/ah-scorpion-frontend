import axios from 'axios';
import {
  COMMENTS_FETCHED,
  COMMENTS_LOADED,
  COMMENTS_LOADING,
  POSTING_COMMENT,
} from './types';
import { userNotLoggedIn } from './currentUser';


export const commentsFetched = message => ({
  type: COMMENTS_FETCHED,
  payload: message,
});

const commentsLoaded = () => ({
  type: COMMENTS_LOADED,
});

const commentsLoading = () => ({
  type: COMMENTS_LOADING,
});

const postigComment = () => ({
  type: POSTING_COMMENT,
});


export const articleComments = (slug) => {
  commentsLoading();
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const commentsUrl = `${apiUrl}/api/v1/articles/${slug}/comments/`;
  return (dispatch) => {
    axios
      .get(commentsUrl)
      .then(response => (response.status === 200
        ? dispatch(commentsFetched(response.data))
        : null))
      .catch(dispatch(userNotLoggedIn()));
  };
};

export const commentsShown = () => (dispatch) => {
  dispatch(commentsLoaded());
};

export const addComment = (slug, content) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/`;
  return (dispatch) => {
    dispatch(postigComment());
    axios
      .post(likeUrl, {
        content,
      })
      .then(response => (response.status === 201
        ? dispatch(articleComments(slug))
        : null))
      .catch((error) => {
        console.log(error);
      });
  };
};
