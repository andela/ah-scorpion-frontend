import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import { signUpError, signUpSuccess } from '../../actions/signUp';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const emailError = { email: ['Email already exists, please login or use a different email'] };
const successMessage = {
  Message: 'Please confirm your email address to complete the registration',
};
const regUrl = 'https://authors-haven-api.herokuapp.com/api/v1/users/signup/';

describe('The SignUp actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch the signUpSuccess action', async (done) => {
    moxios.stubRequest(regUrl, {
      status: 201,
      response: successMessage,
    });

    const returnedAction = [
      {
        type: types.SIGNUP_SUCCESS,
      },
    ];

    const store = mockStore({});
    await store.dispatch(signUpSuccess());
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });

  it('should dispatch the signUpError action', async (done) => {
    moxios.stubRequest(regUrl, {
      status: 404,
      response: emailError,
    });

    const returnedAction = [
      {
        type: types.SIGNUP_ERROR,
        error: emailError,
      },
    ];

    const store = mockStore({});
    await store.dispatch(
      signUpError({
        email: emailError.email,
      }),
    );
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
