import axios from 'axios';
import * as types from './types';

const url = 'https://authors-haven-api.herokuapp.com/api/v1/users';
const regUrl = `${url}/signup/`;

export const signingUp = () => ({ type: types.SIGNUP_REQUEST });

export const signupSuccess = () => ({ type: types.SIGNUP_SUCCESS });

export const signupError = error => ({ type: types.SIGNUP_ERROR, error });

export const handleUserRegistration = userInfo => (dispatch) => {
  dispatch(signingUp());

  axios
    .post(regUrl, userInfo)
    .then(response => (response.status === 201 ? dispatch(signupSuccess()) : null))
    .catch((error) => {
      const errorMsg = error.response.data.errors;

      if (errorMsg.email) {
        dispatch(signupError(errorMsg.email));
      } else if (errorMsg.username) {
        errorMsg.username = errorMsg.username.includes('This field may not be blank.')
          ? 'Please enter a valid username'
          : errorMsg.username;
        dispatch(signupError(errorMsg.username));
      } else if (errorMsg.password) {
        errorMsg.password = errorMsg.password.includes('This field may not be blank.')
          ? 'Please enter a valid password'
          : errorMsg.password;
        dispatch(signupError(errorMsg.password));
      }
    });
};
