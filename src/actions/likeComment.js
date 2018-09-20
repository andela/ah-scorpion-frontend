import axios from 'axios';
import { COMMENT_LIKED } from './types';
import articleComments from './articleComments';


export const commentLiked = comment => ({
  type: COMMENT_LIKED,
  payload: comment,
});


export default function likeComments(slug, commentId) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/${commentId}/like/`;

  return (dispatch) => {
    axios
      .put(likeUrl, {
        slug,
        id: commentId,
      })
      .then(response => (response.status === 200
        ? dispatch(articleComments(slug))
        : null))
      .catch((error) => {
        console.log(error);
      });
  };
}
