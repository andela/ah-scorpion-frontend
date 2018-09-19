import axios from 'axios';
import * as types from './types';

const apiUrl = process.env.REACT_APP_BASE_URL;
const socialUrl = `${apiUrl}/users/social_auth/`;

const beginLogin = () => ({
  type: types.BEGIN_LOGIN,
});

const failLogin = error => ({
  type: types.FAIL_LOGIN,
  payload: error,
});

const successLogin = (response) => {
  this.props.history.push('/');
  return {
    type: types.SUCCESS_LOGIN,
    payload: response,
  };
};

const socialLogin = data => (dispatch) => {
  dispatch(beginLogin());

  // making an API call with the data received from social auth

  return axios
    .post(socialUrl, data)
    .then(
      response => new Promise((resolve) => {
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('image_url', response.data.user.image);
        dispatch(successLogin(response));
        resolve();
      }),
    )
    .catch(({ response }) => {
      // create an error message
      let message = '';
      try {
        [message] = response.data.errors.error;
      } catch (err) {
        // message in case of no internet access
        message = 'You are offline.';
      }

      // dispatch action to login fail reducer
      dispatch(failLogin(message));
    });
};

export default socialLogin;
