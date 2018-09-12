import axios from 'axios';

const getMyUsername = () => localStorage.getItem('username');
const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;

class articleService {
  static getMyArticles() {
    const myUsername = getMyUsername();
    let articles;
    axios.get(`${articlesUrl}?author__username=${myUsername}`)
      .then(
        (response) => { articles = response.data; },
      ).catch(
        error => error,
      );
    return articles;
  }
}


export default articleService;
