import axios from 'axios';
import { articleComments, commentsFetched } from './articleComments';
import {
  COMMENT_DELETED,
} from './types';

const removeDeletedComment = (comments, commentId) => (dispatch) => {
  for (const i in comments) {
    const comment = comments[i];
    if (comment.id === commentId) {
      const index = comments.indexOf(comment);
      comments.splice(index, 1);
    }
  }
  dispatch(commentsFetched(comments));
};

const commentDeleted = () => ({
  type: COMMENT_DELETED,
});

export default function deleteComment(slug, comments, comment) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const apiUrl = process.env.REACT_APP_API_URL;
  const commentId = comment.id;
  const likeUrl = `${apiUrl}/api/v1/articles/${slug}/comments/${commentId}/`;

  return (dispatch) => {
    dispatch(removeDeletedComment(comments, commentId));
    axios
      .delete(likeUrl, {
        slug,
        id: commentId,
      })
      .then((response) => {
        if (response.status === 204){
          dispatch(commentDeleted());
          dispatch(articleComments(slug));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
