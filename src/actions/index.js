import axios from 'axios';
import * as types from './types';

const socialUrl = 'https://authors-haven-api.herokuapp.com/api/v1/users/social_auth/';

export const testStore = data => ({ type: types.TEST_REDUX, payload: data });

const beginLogin = () => ({
  type: types.BEGIN_LOGIN,
});

const failLogin = error => ({
  type: types.FAIL_LOGIN, payload: error,
});

const successLogin = response => ({
  type: types.SUCCESS_LOGIN, payload: response,
});

export const socialLogin = data => (dispatch) => {
  dispatch(beginLogin());

  // making an API call with the data received from social auth

  axios.post(socialUrl, data).then((response) => {
    // set username, email and tokens in local storage
    localStorage.setItem('token', response.data.user.token);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('image_url', response.data.user.image);
    dispatch(successLogin());
    console.log(response);
  }).catch((error) => {
    // create an error message
    let message = '';
    try {
      message = error.response.data.errors.error[0];
    } catch (error) {
      // message in case of no internet access
      message = 'You are be offline.';
    }

    // dispatch action to login fail reducer
    dispatch(failLogin(message));
  });
};
