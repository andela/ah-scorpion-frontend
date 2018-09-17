import axios from 'axios';
import {
  FAVORITE_FETCHED,
  USER_NOT_LOGGED_IN,
} from './types';

const userFetched = (articleId, message) => ({
  type: FAVORITE_FETCHED,
  payload: {
    favorited: message.indexOf(articleId) > -1,
  },
});


export const userNotLoggedIn = () => ({
  type: USER_NOT_LOGGED_IN,
  payload: {},
});


export default function currentUser(articleId) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const favoriteUrl = `${apiUrl}/api/v1/user/`;
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return (dispatch) => {
    axios
      .get(favoriteUrl)
      .then(response => (response.status === 200
        ? dispatch(userFetched(articleId, response.data.user.favorited))
        : null))
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
  };
}
