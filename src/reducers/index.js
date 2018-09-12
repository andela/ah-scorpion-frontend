import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import reset from './resetPassword';
import signupReducer from './signUp';
import user from './user';
import myArticlesReducer from './myArticlesReducer';

export default combineReducers({
  signup: signupReducer,
  reset,
  authState: loginReducer,
  user,
  myArticles: myArticlesReducer,
});
