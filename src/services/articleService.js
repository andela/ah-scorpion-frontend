import axios from 'axios';

const getMyUsername = () => localStorage.getItem('username');
const getMyToken = () => localStorage.getItem('token');
const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;

/** Class that represents API calls related to a user's articles */
class articleService {
  /** * This is the API call for getting a user's articles
   * @returns a Promise that resolves
   * @return {Promise} resolves with the list of articles */
  static getMyArticles() {
    const errorMessage = 'We could not get your articles at the moment. '
      + 'If the problem persists, please refresh the page or login again';

    return new Promise(
      (resolve, reject) => {
        axios
          .get(`${articlesUrl}?author__username=${getMyUsername()}`)
          .then(
            (response) => {
              resolve(response.data);
            },
          )
          .catch(
            () => {
              reject(errorMessage);
            },
          );
      },
    );
  }

  /** * This is the API call for deleting a user's article
   * @param {string} slug - The slug of the article that should be deleted
   * @returns returns a Promise
   * @return {Promise} that resolves after successful deletion */
  static deleteMyArticle(slug) {
    const errorMessage = 'An error occurred while deleting your article. '
      + 'Please refresh the page or login again.';
    return new Promise(
      (resolve, reject) => {
        axios
          .delete(`${articlesUrl}${slug}`, { headers: { Authorization: `Bearer ${getMyToken()}` } })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject(errorMessage);
          });
      },
    );
  }
}


export default articleService;
