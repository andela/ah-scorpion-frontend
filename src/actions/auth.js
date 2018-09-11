import { USER_LOGGED_IN, SIGN_OUT_DONE } from './types';
import api from '../services/api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: SIGN_OUT_DONE });

export const login = credentials => dispatch => api.user.login(credentials)
  .then(user => dispatch(userLoggedIn(user)));


export const logout = (history) => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('image_url');
  dispatch(userLoggedOut())
  history.push('/login');
};
