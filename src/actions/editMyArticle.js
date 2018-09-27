import * as types from './types';
import articleService from '../services/articleService';

const editMyArticleBegin = () => ({ type: types.EDIT_MY_ARTICLE_BEGIN });


export const editMyArticleSuccess = () => ({ type: types.EDIT_MY_ARTICLE_SUCCESS });

export const editMyArticleFailure = errorMessage => (
  { type: types.EDIT_MY_ARTICLE_FAILURE, errorMessage }
);

export const editMyArticleEnd = () => ({ type: types.EDIT_MY_ARTICLE_END });

const handleEditMyArticle = (slug, data, history) => (dispatch) => {
  dispatch(editMyArticleBegin(slug));
  articleService.editMyArticle(slug, data)
    .then((object) => {
      if (object.success) {
        dispatch(editMyArticleSuccess());
        history.push('/my-articles');
      } else { dispatch(editMyArticleFailure(object.errorMessage)); }
    });
};

export default handleEditMyArticle;
