import * as types from './types';
import articleService from '../services/articleService';

const editMyArticleBegin = slug => ({ type: types.EDIT_MY_ARTICLE_BEGIN, slug });


const editMyArticleSuccess = () => ({ type: types.EDIT_MY_ARTICLE_SUCCESS });

const editMyArticleFailure = errorMessage => (
  { type: types.EDIT_MY_ARTICLE_FAILURE, errorMessage }
);

export const editMyArticleEnd = () => ({ type: types.EDIT_MY_ARTICLE_END });

const handleEditMyArticle = slug => (dispatch) => {
  dispatch(editMyArticleBegin());
  articleService.deleteMyArticle(slug)
    .then((object) => {
      if (object.success) {
        dispatch(editMyArticleSuccess());
      } else { dispatch(editMyArticleFailure(object.errorMessage)); }
    });
};

export default handleEditMyArticle;
