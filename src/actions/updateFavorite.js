import axios from 'axios';
import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
} from './types';
import { userNotLoggedIn } from './currentUser';


const favoriteChanged = message => ({
  type: FAVORITE_CHANGED,
  payload: {
    favorite: message.favoriting_users !== undefined,
    message,
  },
});

const favoriteFailed = message => ({
  type: FAVORITE_FAILED,
  payload: {
    favorite: false,
    message,
  },
});

export default function favouriteArticle(slug) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const favoriteUrl = `${apiUrl}/api/v1/articles/${slug}/favorite/`;

  return (dispatch) => {
    axios
      .post(favoriteUrl)
      .then(response => (response.status === 200
        ? dispatch(favoriteChanged(response.data.article !== undefined
          ? response.data.article
          : response.data.message))
        : dispatch(favoriteFailed(response.data))))
      .catch((error) => {
        if (error.response.data.detail !== undefined) {
          dispatch(userNotLoggedIn());
        } else dispatch(favoriteFailed(error.response));
      });
  };
}
