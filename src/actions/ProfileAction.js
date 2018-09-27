import axios from 'axios';
import { GET_USER_PROFILE, EDIT_USER_PROFILE, PROFILE_ERROR } from './types';

const USER_PROFILE = response => ({
  type: GET_USER_PROFILE,
  payload: response.user,
});

const Edit_Profile = response => ({
  type: EDIT_USER_PROFILE,
  payload: response,
});

const errorMessage = err => ({
  type: PROFILE_ERROR,
  payload: err,
});

const baseUrl = process.env.REACT_APP_BASE_URL;

export const Profile_Account = () => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'get',
    url: `${baseUrl}/user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log('am the response', response.data);
    dispatch(USER_PROFILE(response.data));
  });
};

export const Edit_Account = (data, history) => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log('DAta', data);
  axios({
    method: 'put',
    url: `${baseUrl}/user/`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log('am', response.data);
      dispatch(Edit_Profile(response.data));
      history.push('/profile');
    })
    .catch((err) => {
      dispatch(errorMessage(err.response.data.errors));
    });
};
