import axios from 'axios';
import articleComments from './articleComments';

export default function dislikeComments(slug, commentId) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/${commentId}/`;
  return (dispatch) => {
    axios
      .delete(likeUrl, {
        slug,
        id: commentId,
      })
      .then(response => (response.status === 204
        ? dispatch(articleComments(slug))
        : null))
      .catch((error) => {
        console.log(error);
      });
  };
}
