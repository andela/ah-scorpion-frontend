import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userData = {
  user: {
    email: 'ruthnwaiganjo@gmail.com',
    username: 'ruth',
    bio: '',
    image: null,
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6eyJlbWFpbCI6InJ1dGhud2FpZ2Fuam9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJydXRoIiwiYmlvIjoiIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE1MzYwNzU3MDYsImV4cCI6MTUzNjE2MjEwNn0.SDcAoYLYuth6WW-QfstcGnV10Fzt_zYq9_7Ofo4KyZ4'
  }
};
const userResponse = {
  LoginData: userData,
  status: 'success'
};

describe('login action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create login Action', () => {
    it('Should dispatch login action', async done => {
      moxios.stubRequest(
        'https://authors-haven-api.herokuapp.com/api/v1/users/login/',
        { status: 200, response: userData },

      );
      const returnedAction = [
        {
          type: types.USER_LOGGED_IN,
          user: userData.user
        }
      ];

      const store = mockStore({});
      await store.dispatch(
        login({
          ...userResponse.LoginData
        })
      );
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
