import favoriteReducer from '../../reducers/favoriteReducer';
import {
  FAVORITE_CHANGED,
  FAVORITE_FETCHED,
  FAVORITE_FAILED,
  USER_NOT_LOGGED_IN, BEGIN_FETCHING_FAVOURITE,
} from '../../actions/types';


describe('Favouriting reducer', () => {
  const state = {
    favorite: false,
    message: '',
    favorite_failed: false,
  };
  const payload = {
    favorite: true,
    message: 'The action was completed',
    favorite_failed: true,
  };

  /**
   * Define that the favourite status will be undetermined if the user if not among
   * the users that have favourited the article
   */
  it('should fetch favouriting status for already favourited', () => {
    const expected = {
      favorite: undefined,
      message: 'You have not favourited this article',
      favorite_failed: false,
      loading: false,
    };
    expect(favoriteReducer(state, { type: FAVORITE_FETCHED, payload })).toEqual(expected);
  });

  it('should fetch favouriting status for already unfavourited', () => {
    const expected = {
      favorite: undefined,
      message: 'You have not favourited this article',
      favorite_failed: false,
      loading: false,
    };
    expect(favoriteReducer(state, { type: FAVORITE_FETCHED, payload })).toEqual(expected);
  });


  it('should change the favouriting status', () => {
    const payload1 = {
      favorite: true,
      message: 'The action was completed',
      favorite_failed: false,
    };
    const expected = {
      favorite: false,
      message: 'You have unfavourited this article',
      favorite_failed: false,
      loading: false,
    };
    expect(favoriteReducer(state, { type: FAVORITE_CHANGED, payload: payload1 })).toEqual(expected);
  });

  it('should not change the favouriting status', () => {
    const payload1 = {
      favorite: true,
      message: 'The action was completed',
      favorite_failed: true,
    };
    const expected = {
      favorite: false,
      message: 'We are unable to complete your request. Try again later',
      favorite_failed: true,
      loading: false,
    };
    expect(favoriteReducer(state, { type: FAVORITE_FAILED, payload: payload1 })).toEqual(expected);
  });

  it('should return a message telling the user to login first', () => {
    const expected = {
      favorite: false,
      message: 'You must login to favourite or unfavourite an article',
      favorite_failed: true,
      loading: false,
    };
    expect(favoriteReducer(state, { type: USER_NOT_LOGGED_IN, payload: {} }))
      .toEqual(expected);
  });

  it('should set loading to true when promise is pending', () => {
    const expected = {
      favorite: false,
      message: '',
      favorite_failed: false,
      loading: true,
    };
    expect(favoriteReducer(state, { type: BEGIN_FETCHING_FAVOURITE, payload: {} }))
      .toEqual(expected);
  });
});
