import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { favoriteChanged, favoriteFailed } from '../../actions/updateFavorite';
import { userFetched, userNotLoggedIn } from '../../actions/currentUser';
import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
  FAVORITE_FETCHED,
  USER_NOT_LOGGED_IN,
} from '../../actions/types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const apiUrl = process.env.REACT_APP_API_URL;
let slug;


describe('article favouriting actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  let favoriteUrl;

  it('It should not change the favourite status (The slig in invalid)', async (done) => {
    slug = 'this-is-a-slug-22736AGHHHkkkk6787';
    favoriteUrl = `${apiUrl}/api/v1/articles/${slug}/favorite/`;

    moxios.stubRequest(favoriteUrl, {
      status: 201,
      response: {},
    });

    const returnedAction = [
      {
        payload:
          {
            favorite: false,
            message: undefined,
          },
        type: FAVORITE_FAILED,
      },
    ];

    const store = mockStore({});
    await store.dispatch(favoriteFailed());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });

  it('It should change and retrieve the favoutite status ', async (done) => {
    // Get a valid slug
    moxios.stubRequest(favoriteUrl, {
      status: 201,
      response: {},
    });

    const returnedAction = [
      {
        payload:
          {
            favorite: true,
            message: {
              favoriting_users: [4, 5],
            },
          },
        type: FAVORITE_CHANGED,
      },
    ];

    const params = {
      favoriting_users: [4, 5],
    };

    const store = mockStore({});
    await store.dispatch(favoriteChanged(params));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});

describe('<currentUser .>', () => {
  const currentUserUrl = `${apiUrl}/api/v1/user/`;
  /**
   * Test that the favourite status is successfully retrieved
   */
  it('should fetch the user details', async (done) => {
    moxios.stubRequest(currentUserUrl, {
      status: 201,
      response: {},
    });

    const returnedAction = [
      {
        payload:
          { favorited: false },
        type: FAVORITE_FETCHED,
      },
    ];

    const params = [4, 5];

    const store = mockStore({});
    await store.dispatch(userFetched(24, params));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });


  /**
   * Test that the favourite status retrieval fails bacure no user is logged in
   */
  it('should return message that user is not logged in', async (done) => {
    moxios.stubRequest(currentUserUrl, {
      status: 201,
      response: {},
    });

    const returnedAction = [
      {
        payload: { },
        type: USER_NOT_LOGGED_IN,
      },
    ];

    const store = mockStore({});
    await store.dispatch(userNotLoggedIn());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
