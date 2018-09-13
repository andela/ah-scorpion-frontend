import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import reset from './resetPassword';
import signupReducer from './signUp';
import user from './user';
import createArticleReducer from './createArticleReducer';

export default combineReducers({
  signup: signupReducer,
  reset,
  authState: loginReducer,
  user,
  createArticleReducer,
});
