import { combineReducers } from 'redux';

import testReducer from './testReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  test: testReducer,
  authState: loginReducer,
});
