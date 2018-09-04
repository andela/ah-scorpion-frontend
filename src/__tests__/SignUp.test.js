import signUpReducer from '../reducers/signUp';
import * as types from '../actions/types';

describe('The SignUp reducer', () => {
  const initialState = {
    success: false,
    error: {},
    failure: false,
    isFetching: false,
  };

  it('should have default state', () => {
    expect(signUpReducer(undefined, 'AN_ACTION_THAT_DOES_NOT_EXIST')).toEqual(initialState);
  });

  it('should change isFetching to true when action.type is SIGNUP_REQUEST', () => {
    expect(signUpReducer(undefined, { type: types.SIGNUP_REQUEST })).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it('should change isFetching to false, failure to true and error to the error message when action.type is SIGNUP_ERROR', () => {
    expect(
      signUpReducer(undefined, { type: types.SIGNUP_ERROR, error: 'Failed to SignUp' }),
    ).toEqual({
      ...initialState,
      isFetching: false,
      failure: true,
      error: 'Failed to SignUp',
    });
  });

  it('should change isFetching to false and success to true when action.type is SIGNUP_SUCCESS', () => {
    expect(signUpReducer(undefined, { type: types.SIGNUP_SUCCESS })).toEqual({
      ...initialState,
      isFetching: false,
      success: true,
    });
  });
});
