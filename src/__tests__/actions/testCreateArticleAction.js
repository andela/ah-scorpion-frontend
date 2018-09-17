import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import createArticleAction from '../../actions/createArticleAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const baseUrl = process.env.REACT_APP_BASE_URL;
const createUrl = `${baseUrl}/articles/`;

describe('The SignUp actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the signUpSuccess action', async (done) => {
    moxios.stubRequest(createUrl, data, {
      status: 201,
    });

    const returnedAction = [
      {
        type: types.ARTICLE_CREATE,
      },
    ];

    const store = mockStore({});
    await store.dispatch(createArticleAction());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
