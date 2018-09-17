import createArticleReducer from '../../reducers/createArticleReducer';
import * as types from '../../actions/types';

describe('Test the text area reducer', () => {
  const initialState = {
    loading: false,
    payload: {},
    success: false,
    failure: false,
    errors: null,
  };
  it('Should have a default state', () => {
    expect(createArticleReducer(undefined, 'Action does not exist')).toEqual(
      initialState,
    );
  });
  it('Should change loading to true when action.type is ARTICLE_CREATE', () => {
    expect(
      createArticleReducer(undefined, { type: types.ARTICLE_CREATE }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('Should change success to false and failures to true and errors when action.type is ARTICLE_FAILURE', () => {
    expect(
      createArticleReducer(undefined, {
        type: types.ARTICLE_FAILURE,
        errors: 'Failed to create article',
      }),
    ).toEqual({
      ...initialState,
      failure: true,
      loading: false,
      payload: '',
      success: false,
      errors: 'Failed to create article',
    });
  });
  it('Should return a payload, change success to true, failure to false, and errors to null', () => {
    expect(
      createArticleReducer(undefined, {
        type: types.ARTICLE_SUCCESS,
        payload: 'Article object returned',
      }),
    ).toEqual({
      ...initialState,
      success: true,
      payload: 'Article object returned',
    });
  });
});
