import axios from 'axios';
import {
  COMMENTS_FETCHED,
  COMMENTS_LOADED,
  COMMENTS_LOADING,
  POSTING_COMMENT,
  COMMENT_POSTED,
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

const postingComment = () => ({
  type: POSTING_COMMENT,
});

const postedComment = () => ({
  type: COMMENT_POSTED,
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
        : dispatch(postedComment())))
      .catch(dispatch(userNotLoggedIn()));
  };
};

export const commentsShown = () => (dispatch) => {
  dispatch(commentsLoaded());
};

export const addComment = (slug, content, parent) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  let likeUrl;
  if (parent < 1) {
    likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/`;
  } else {
    likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/${parent}/`;
  }
  return (dispatch) => {
    dispatch(postingComment());
    axios
      .post(likeUrl, {
        content,
      })
      .then(response => (response.status === 201
        ? dispatch(articleComments(slug))
        : dispatch(postedComment())))
      .catch((error) => {
        dispatch(postedComment());
      });
  };
};

export const editComment = (slug, content, commentId) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/${commentId}/`;
  return (dispatch) => {
    dispatch(postingComment());
    axios
      .put(likeUrl, {
        content,
      })
      .then(response => (response.status === 200
        ? dispatch(articleComments(slug))
        : dispatch(postedComment())))
      .catch((error) => {
        dispatch(postedComment());
      });
  };
};
