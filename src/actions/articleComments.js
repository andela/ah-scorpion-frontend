import axios from 'axios';
import { COMMENTS_FETCHED, COMMENTS_LOADED, COMMENTS_LOADING } from './types';
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

export const articleComments = (slug) => {
  commentsLoading();
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const favoriteUrl = `${apiUrl}/api/v1/articles/${slug}/comments/`;
  return (dispatch) => {
    axios
      .get(favoriteUrl)
      .then(response => (response.status === 200
        ? dispatch(commentsFetched(response.data))
        : null))
      .catch(dispatch(userNotLoggedIn()));
  };
};

export const commentsShown = () => (dispatch) => {
  dispatch(commentsLoaded());
};
