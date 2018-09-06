import reducer from '../../reducers/user';

describe('Login reducer', () => {
  const initialState = {};

  it('should have default state', () => {
    expect(reducer(undefined, 'ACTION_NOT_EXIST')).toEqual(initialState);
  });
});
