import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteReducer from './favoriteReducer';
import reset from './resetPassword';
import signupReducer from './signUp';
import user from './user';
import createArticleReducer from './createArticleReducer';
import rate from './ratingReducer';
import myArticlesReducer from './myArticlesReducer';
<<<<<<< HEAD
import editMyArticleReducer from './editMyArticleReducer';
import articlesReducer from './articlesReducer';
=======
import account from './ProfileReducer';
>>>>>>> fix bug for user profile

export default combineReducers({
  signup: signupReducer,
  reset,
  favorite: favoriteReducer,
  auth: loginReducer,
  user,
  createArticleReducer,
  rate,
  myArticles: myArticlesReducer,
<<<<<<< HEAD
  AllArticles: articlesReducer,
  editMyArticle: editMyArticleReducer,
=======
  account,
>>>>>>> fix bug for user profile
});
