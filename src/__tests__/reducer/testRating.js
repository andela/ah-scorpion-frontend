import reducer from '../../reducers/ratingReducer';
import * as types from '../../actions/types';

describe('rate reducer', () => {
  const state = {};

  it('should have default state', () => {
    expect(reducer(state, 'ACTION_NOT_EXIST')).toEqual(state);
  });
  it('reducer for error response rating', () => {
    expect(
      reducer(undefined, { type: types.RATING_ERROR, payload: 'You cannot rate your own article' }),
    ).toEqual({
      ...state,
      errorMessage: 'You cannot rate your own article',
    });
  });
  it('reducer average rating', () => {
    expect(
      reducer(undefined, { type: types.CURRENT_AVG_RATE, payload: { averageRating: 2 } }),
    ).toEqual({
      ...state,
      rating: 2,
    });
  });
  it('reducer rating', () => {
    expect(
      reducer(undefined, { type: types.USER_RATE_ARTICLE, val: { ratings: { stars: 2 } } }),
    ).toEqual({
      ...state,
      rating: 2,
    });
  });
});
