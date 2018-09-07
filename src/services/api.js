import axios from 'axios';

const apiUrl = 'https://authors-haven-api.herokuapp.com';

export default {
  user: {
    login: credentials => axios
      .post(`${apiUrl}/api/v1/users/login/`, credentials)
      .then((response) => {
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('image_url', response.data.user.image);
        return response.data.user;
      }),
  },
};