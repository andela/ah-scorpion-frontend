import loginReducer from '../reducers/loginReducer';
import * as types from '../actions/types';

describe('The login reducer', () => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
  };
  it('should have default state', () => {
    expect(loginReducer(undefined, 'AN_ACTION_THAT_DOES_NOT_EXIST')).toEqual(initialState);
  });

  it('should change loading to true when action.type is BEGIN_LOGIN', () => {
    expect(loginReducer(undefined, { type: types.BEGIN_LOGIN })).toEqual(
      { ...initialState, loading: true, message: '' },
    );
  });

  it('should change loading to false when action.type is FAIL_LOGIN', () => {
    expect(loginReducer(undefined,
      { type: types.FAIL_LOGIN, payload: 'Failed to login' })).toEqual(
      { ...initialState, loading: false, message: 'Failed to login' },
    );
  });

  it('should change loading to false and isAuthenticated to true when action.type is SUCCESS_LOGIN',
    () => {
      expect(loginReducer(undefined,
        { type: types.SUCCESS_LOGIN })).toEqual(
        {
          ...initialState, loading: false, isAuthenticated: true, message: '',
        },
      );
    });
});
