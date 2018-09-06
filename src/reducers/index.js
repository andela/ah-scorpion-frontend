import reset from './resetPassword';
import { combineReducers } from 'redux';
import testReducer from './testReducer';
import signupReducer from './signUp';

export default combineReducers({
  test: testReducer,
  signup: signupReducer,
  reset,
});
