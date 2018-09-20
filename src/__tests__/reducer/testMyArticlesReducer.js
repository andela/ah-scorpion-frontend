import myArticlesReducer, { initialState } from '../../reducers/myArticlesReducer';
import * as types from '../../actions/types';

describe('The myArticlesReducer', () => {
  const state = {};

  it('should return the same state on an inapplicable action', () => {
    const newState = myArticlesReducer(state, { type: 'AN_ACTION_THAT_DOES_NOT_EXIST' });
    expect(newState).toEqual(state);
  });

  it('should return the initialState on an inapplicable action and without providing state', () => {
    const newState = myArticlesReducer(undefined, { type: 'AN_ACTION_THAT_DOES_NOT_EXIST' });
    expect(newState).toEqual(initialState);
  });

  it('should change isFetching to true when type is GET_MY_ARTICLES_BEGIN', () => {
    const newState = myArticlesReducer(undefined, { type: types.GET_MY_ARTICLES_BEGIN });
    const expectedState = { ...initialState, isFetching: true };
    expect(newState).toEqual(expectedState);
  });

  it('should update isFetching, fetchSuccess and articles state when type is GET_MY_ARTICLES_SUCCESS', () => {
    const newState = myArticlesReducer(undefined, {
      type: types.GET_MY_ARTICLES_SUCCESS,
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

  it('should update isFetching, fetchFailure and errorMessage state when type is GET_MY_ARTICLES_FAILURE', () => {
    const newState = myArticlesReducer(undefined, {
      type: types.GET_MY_ARTICLES_FAILURE,
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

  it('should update deletedArticleSlug state when type is DELETE_MY_ARTICLE_BEGIN', () => {
    const newState = myArticlesReducer(undefined, {
      type: types.DELETE_MY_ARTICLE_BEGIN,
      slug: 'test-Slug-001',
    });
    const expectedState = {
      ...initialState,
      deletedArticleSlug: 'test-Slug-001',
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update deletedArticleSlug state when type is DELETE_MY_ARTICLE_CONFIRM', () => {
    const newState = myArticlesReducer(undefined, {
      type: types.DELETE_MY_ARTICLE_CONFIRM,
    });
    const expectedState = {
      ...initialState,
      isDeleting: true,
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update isDeleting, deleteSuccess, deletedArticleSlug and deleteFailure state when type is DELETE_MY_ARTICLE_SUCCESS', () => {
    const newState = myArticlesReducer(undefined, {
      type: types.DELETE_MY_ARTICLE_SUCCESS,
    });
    const expectedState = {
      ...initialState,
      isDeleting: false,
      deleteSuccess: true,
      deletedArticleSlug: '',
      deleteFailure: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update isDeleting, deleteFailure, errorMessage and deleteSuccess state when type is DELETE_MY_ARTICLE_FAILURE', () => {
    const newState = myArticlesReducer(undefined, {
      type: types.DELETE_MY_ARTICLE_FAILURE,
      errorMessage: 'An error occurred',
    });
    const expectedState = {
      ...initialState,
      isDeleting: false,
      deleteFailure: true,
      errorMessage: 'An error occurred',
      deleteSuccess: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it('should update everything except deletedArticleSlug and articles state when type is POST_REQUEST_CLEAN_UP', () => {
    const customState = {
      ...initialState,
      deletedArticleSlug: 'test-slug-001',
      articles: [{}, {}, {}],
    };
    const newState = myArticlesReducer(customState, {
      type: types.POST_REQUEST_CLEAN_UP,
    });
    const expectedState = {
      ...initialState,
      deletedArticleSlug: 'test-slug-001',
      articles: [{}, {}, {}],
    };
    expect(newState).toEqual(expectedState);
  });
});
