import articlesReducer, { initialState } from '../../reducers/articlesReducer';
import * as types from '../../actions/types';

describe('The articlesReducer', () => {
  const state = {};

  it('should return the same state on an inapplicable action', () => {
    const newState = articlesReducer(state, { type: 'AN_ACTION_THAT_DOES_NOT_EXIST' });
    expect(newState).toEqual(state);
  });

  it('should return the initialState on an inapplicable action and without providing state', () => {
    const newState = articlesReducer(undefined, { type: 'AN_ACTION_THAT_DOES_NOT_EXIST' });
    expect(newState).toEqual(initialState);
  });

  it('should change isFetching to true when type is GET_ARTICLES_BEGIN', () => {
    const newState = articlesReducer(undefined, { type: types.GET_MY_ARTICLES_BEGIN });
    const expectedState = { ...initialState, isFetching: true };
    expect(newState).toEqual(expectedState);
  });

  it('should update isFetching, fetchSuccess and articles state when type is GET_ARTICLES_SUCCESS', () => {
    const newState = articlesReducer(undefined, {
      type: types.GET_ARTICLES_SUCCESS,
      data: [{}, {}, {}],
    });
    const expectedState = {
      ...initialState,
      isFetching: false,
      fetchSuccess: true,
      articles: [{}, {}, {}],
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update isFetching, fetchFailure and errorMessage state when type is GET_ARTICLES_FAILURE', () => {
    const newState = articlesReducer(undefined, {
      type: types.GET_ARTICLES_FAILURE,
      errorMessage: 'An error occurred',
    });
    const expectedState = {
      ...initialState,
      isFetching: false,
      fetchFailure: true,
      errorMessage: 'An error occurred',
    };
    expect(newState).toEqual(expectedState);
  });
});
