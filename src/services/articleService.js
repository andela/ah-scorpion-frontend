import axios from 'axios';

const getMyUsername = () => localStorage.getItem('username');
const getMyToken = () => localStorage.getItem('token');
const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;

/** Class that represents API calls related to a user's articles */
class articleService {
  /** * This is the API call for getting a user's articles
   * @returns an Object with the success status and article list or error message
   * @return {Object} success: bool, errorMessage: string, articles: Array */
  static getMyArticles() {
    const errorMessage = 'We could not get your articles at the moment. '
      + 'If the problem persists, please refresh the page or login again';

    return axios
      .get(`${articlesUrl}?author__username=${getMyUsername()}`)
      .then(response => ({
        success: true,
        articles: response.data,
      }))
      .catch(() => ({
        success: false,
        errorMessage,
      }));
  }

  /** * This is the API call for getting one article
   * @returns an Object with the success status and article list or error message
   * @return {Object} success: bool, errorMessage: string, article: Object */
  static getOneArticle(slug) {
    const errorMessage = 'We could not get this article at the moment. '
      + 'If the problem persists, please refresh the page or login again';

    return axios
      .get(`${articlesUrl}${slug}`)
      .then(response => ({
        success: true,
        articles: response.data,
      }))
      .catch(() => ({
        success: false,
        errorMessage,
      }));
  }

  /** * This is the API call for deleting a user's article
   * @param {string} slug - The slug of the article that should be deleted
   * @returns an Object with the success status and/or error message
   * @return {Object} success: bool, errorMessage: string */
  static deleteMyArticle(slug) {
    const errorMessage = 'An error occurred while deleting your article. '
    + 'Please refresh the page or login again.';

    return axios
      .delete(`${articlesUrl}${slug}`, { headers: { Authorization: `Bearer ${getMyToken()}` } })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false, errorMessage }));
  }
}

export default articleService;
