import axios from 'axios';

const apiUrl = "https://authors-haven-api.herokuapp.com";

export default {
  user: {
    login: credentials =>
      axios
        .post(`${apiUrl}/api/v1/users/login/`, credentials)
        .then(res => res.data.user)
  }
};
