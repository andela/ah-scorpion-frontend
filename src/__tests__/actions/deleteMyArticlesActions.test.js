import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actions/types';
import { deleteMyArticleSuccess, deleteMyArticleFailure } from '../../actions/deleteMyArticle';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const { REACT_APP_API_URL } = process.env;
const slug = 'test-article-slug';
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/${slug}`;
describe('The deleteMyArticles actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the deleteMyArticleSuccess action on a successful request', async (done) => {
    moxios.stubRequest(articlesUrl, {
      status: 204,
    });

    const returnedAction = [
      {
        type: types.DELETE_MY_ARTICLE_SUCCESS,
      },
    ];

    const store = mockStore({});
    await store.dispatch(deleteMyArticleSuccess());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });

  it('should dispatch the deleteMyArticleFailure action on a failed request', async (done) => {
    moxios.stubRequest(articlesUrl, {
      status: 400,
      response: 'an error occurred',
    });

    const returnedAction = [
      {
        type: types.DELETE_MY_ARTICLE_FAILURE,
        errorMessage: 'An error occurred',
      },
    ];

    const store = mockStore({});
    await store.dispatch(deleteMyArticleFailure('An error occurred'));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
