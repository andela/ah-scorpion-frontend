import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import {
  articleSuccess,
  articleFailure,
} from '../../actions/createArticleAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const baseUrl = process.env.REACT_APP_BASE_URL;
const createUrl = `${baseUrl}/articles/`;
describe('The createArticle actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the articleSuccess action', async (done) => {
    moxios.stubRequest(createUrl, {
      status: 201,
    });

    const returnedAction = [{ type: types.ARTICLE_SUCCESS }];
    const store = mockStore({});
    await store.dispatch(articleSuccess());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });

  it('should dispatch the articleFailure action', async (done) => {
    moxios.stubRequest(createUrl, { status: 400, response: 'error message' });

    const returnedAction = [
      { type: types.ARTICLE_FAILURE, errors: 'error message' },
    ];
    const store = mockStore({});
    await store.dispatch(articleFailure('error message'));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
