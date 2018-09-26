import axios from 'axios';
import {
  HISTORY_FETCHED,
  COMMENTS_FETCHED,
  COMMENTS_LOADED,
  COMMENTS_LOADING,
  POSTING_COMMENT,
  COMMENT_POSTED,
  HISTORY_CLEARED,
} from './types';
import { userNotLoggedIn } from './currentUser';


export const commentsFetched = message => ({
  type: COMMENTS_FETCHED,
  payload: message,
});

const commentsLoaded = () => ({
  type: COMMENTS_LOADED,
});

export const commentsLoading = () => ({
  type: COMMENTS_LOADING,
});

export const postingComment = () => ({
  type: POSTING_COMMENT,
});

export const postedComment = message => ({
  type: COMMENT_POSTED,
  payload: { message },
});

export const tempCommentsList = (comments, comment, parent, updating = false) => (dispatch) => {
  parent = parent === undefined || parent === null ? null : parent;
  const time = updating ? 'Updating...' : 'Posting...';
  let newComment;
  if (!updating) {
    newComment = {
      user: {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        id: 0,
        likes: 0,
        dislikes: 0,
      },
      id: -1,
      createdAt: time,
      content: comment,
      parent,
    };
    comments.push(newComment);
  } else {
    for (const i in comments) {
      const commentToUpdate = comments[i];
      if (commentToUpdate.id === parent) {
        const index = comments.indexOf(commentToUpdate);
        commentToUpdate.content = comment;
        commentToUpdate.createdAt = time;
        comments.splice(index, 1, commentToUpdate);
      }
    }
  }
  dispatch(commentsFetched(comments));
};

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
        console.log(error);
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
        console.log(error);
        dispatch(postedComment());
      });
  };
};

export const commentHistoryFetched = history => ({
  type: HISTORY_FETCHED,
  payload: history,
});

export const clearHistory = () => ({
  type: HISTORY_CLEARED,
});

export const commentHistory = (slug, commentId) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/history/${commentId}/`;
  return (dispatch) => {
    dispatch(clearHistory());
    axios
      .get(likeUrl, {
        slug, id: commentId,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(commentHistoryFetched(response.data));
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};
