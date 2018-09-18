import axios from 'axios';
import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
  BEGIN_FETCHING_FAVOURITE,
} from './types';
import { userNotLoggedIn } from './currentUser';


export const favoriteChanged = message => ({
  type: FAVORITE_CHANGED,
  payload: {
    favorite: message.favoriting_users !== undefined,
    message,
  },
});

export const favoriteFailed = message => ({
  type: FAVORITE_FAILED,
  payload: {
    favorite: false,
    message,
  },
});

export const favoriteCallStarted = () => ({
  type: BEGIN_FETCHING_FAVOURITE,
  payload: {},
});

export default function favouriteArticle(slug) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const favoriteUrl = `${apiUrl}/api/v1/articles/${slug}/favorite/`;

  return (dispatch) => {
    dispatch(favoriteCallStarted());
    console.log('Still got here');
    axios
      .post(favoriteUrl)
      .then(response => (response.status === 200
        ? dispatch(favoriteChanged(response.data.article !== undefined
          ? response.data.article
          : response.data.message))
        : dispatch(favoriteFailed(response.data))))
      .catch((error) => {
        if (error.response === undefined) {
          dispatch(favoriteFailed(error.response));
        } else if (error.response.data === undefined) {
          dispatch(favoriteFailed(error.response));
        } else if (error.response.data.detail !== undefined) {
          dispatch(userNotLoggedIn());
        } else {
          dispatch(favoriteFailed(error.response));
        }
      });
  };
}
