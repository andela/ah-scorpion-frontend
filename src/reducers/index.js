import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import reset from './resetPassword';
import signupReducer from './signUp';

export default combineReducers({
  signup: signupReducer,
  reset,
  authState: loginReducer,
});
