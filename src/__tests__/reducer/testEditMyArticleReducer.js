import editMyArticleReducer, { initialState } from '../../reducers/editMyArticleReducer';
import * as types from '../../actions/types';

describe('The editMyArticle reducer', () => {
  const state = {};

  it('should return the same state on an inapplicable action', () => {
    const newState = editMyArticleReducer(state, { type: 'AN_ACTION_THAT_DOES_NOT_EXIST' });
    expect(newState).toEqual(state);
  });

  it('should return the initialState on an inapplicable action and without providing state', () => {
    const newState = editMyArticleReducer(undefined, { type: 'AN_ACTION_THAT_DOES_NOT_EXIST' });
    expect(newState).toEqual(initialState);
  });

  it('should change isFetching to true when type is GET_ONE_ARTICLE_BEGIN', () => {
    const newState = editMyArticleReducer(undefined, { type: types.GET_ONE_ARTICLE_BEGIN });
    const expectedState = { ...initialState, isFetching: true };
    expect(newState).toEqual(expectedState);
  });

  it('should update isFetching, fetchSuccess and article state when type is GET_ONE_ARTICLE_SUCCESS', () => {
    const newState = editMyArticleReducer(undefined, {
      type: types.GET_ONE_ARTICLE_SUCCESS,
      data: [{}],
    });
    const expectedState = {
      ...initialState,
      isFetching: false,
      fetchSuccess: true,
      article: [{}],
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update isFetching, fetchFailure and errorMessage state when type is GET_ONE_ARTICLE_FAILURE', () => {
    const newState = editMyArticleReducer(undefined, {
      type: types.GET_ONE_ARTICLE_FAILURE,
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

  it('should update isSubmitting to true when type is EDIT_MY_ARTICLE_BEGIN', () => {
    const newState = editMyArticleReducer(undefined, { type: types.EDIT_MY_ARTICLE_BEGIN });
    const expectedState = { ...initialState, isSubmitting: true };
    expect(newState).toEqual(expectedState);
  });

  it('should update isDeleting, submitSuccess and submitFailure state when type is EDIT_MY_ARTICLE_SUCCESS', () => {
    const newState = editMyArticleReducer(undefined, { type: types.EDIT_MY_ARTICLE_SUCCESS });
    const expectedState = {
      ...initialState,
      isDeleting: false,
      submitSuccess: true,
      submitFailure: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update isSubmitting, submitFailure ,submitSuccess and errorMessage state when type is EDIT_MY_ARTICLE_FAILURE', () => {
    const newState = editMyArticleReducer(undefined, {
      type: types.EDIT_MY_ARTICLE_FAILURE,
      errorMessage: 'An error occurred',
    });
    const expectedState = {
      ...initialState,
      isSubmitting: false,
      submitFailure: true,
      errorMessage: 'An error occurred',
      submitSuccess: false,
    };
    expect(newState).toEqual(expectedState);
  });
});
