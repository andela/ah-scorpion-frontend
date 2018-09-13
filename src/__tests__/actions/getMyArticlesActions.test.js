import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actions/types';
import { getMyArticlesSuccess, getMyArticlesFailure } from '../../actions/getMyArticles';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const { REACT_APP_API_URL } = process.env;
const articlesUrl = `${REACT_APP_API_URL}/api/v1/articles/`;

const articles = [
  {
    id: 43,
    title: "Lenny's First Article 1",
    author: {
      email: 'lennykmutua@gmail.com',
      username: 'lenny',
      bio: '',
      image: '',
    },
    likes: 0,
    dislikes: 0,
    favorited: 1,
    averageRating: null,
    ratingsCount: 0,
    slug: 'lennys-first-article-1-29b5102ef9a84eb9bfbf60da42f63122',
    body: "Like I said... I don't know what's going on. I'm just testing Hoslack's work.",
    description: "This is my first article and I don't know what's going on...",
    images: ['https://url-to-image'],
    createdAt: '2018-09-12T18:51:24.099861Z',
    updatedAt: '2018-09-12T18:51:24.100977Z',
    tagList: ['Lenny', 'First'],
  },
];
describe('The getMyArticles actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the getMyArticlesSuccess action on a successful request', async (done) => {
    moxios.stubRequest(articlesUrl, {
      status: 200,
      response: articles,
    });

    const returnedAction = [
      {
        type: types.GET_MY_ARTICLES_SUCCESS,
        data: articles,
      },
    ];

    const store = mockStore({});
    await store.dispatch(getMyArticlesSuccess(articles));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });

  it('should dispatch the getMyArticlesFailure action on a failed request', async (done) => {
    moxios.stubRequest(articlesUrl, {
      status: 400,
    });

    const returnedAction = [
      {
        type: types.GET_MY_ARTICLES_FAILURE,
        errorMessage: 'An error occurred',
      },
    ];

    const store = mockStore({});
    await store.dispatch(getMyArticlesFailure('An error occurred'));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
