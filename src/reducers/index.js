import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteReducer from './favoriteReducer';
import reset from './resetPassword';
import signupReducer from './signUp';
import user from './user';

export default combineReducers({
  signup: signupReducer,
  reset,
  favorite: favoriteReducer,
  auth: loginReducer,
  user,
});
