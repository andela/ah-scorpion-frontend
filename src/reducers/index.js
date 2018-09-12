import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteReducer from './favoriteReducer';
import reset from './resetPassword';
import signupReducer from './signUp';
import user from './user';
import createArticleReducer from './createArticleReducer';
import rate from './ratingReducer';
import myArticlesReducer from './myArticlesReducer';

export default combineReducers({
  signup: signupReducer,
  reset,
  favorite: favoriteReducer,
  auth: loginReducer,
  user,
  createArticleReducer,
  rate,
  myArticles: myArticlesReducer,
});
