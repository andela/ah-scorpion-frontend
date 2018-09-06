import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import * as types from '../actions/types';
import signUpReducer from '../reducers/signUp';
import { signUpSuccess, signUpError } from '../actions/signUp';
import SignUp from '../containers/SignUp';
import SignUpForm from '../components/SignUpForm';
import reducers from '../reducers';

Enzyme.configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const emailError = { email: ['Email already exists, please login or use a different email'] };
const successMessage = {
  Message: 'Please confirm your email address to complete the registration',
};
const regUrl = 'https://authors-haven-api.herokuapp.com/api/v1/users/signup/';

describe('The SignUp reducer', () => {
  const initialState = {
    success: false,
    error: {},
    failure: false,
    isFetching: false,
  };

  it('should have default state', () => {
    expect(signUpReducer(undefined, 'AN_ACTION_THAT_DOES_NOT_EXIST')).toEqual(initialState);
  });

  it('should change isFetching to true when action.type is SIGNUP_REQUEST', () => {
    expect(signUpReducer(undefined, { type: types.SIGNUP_REQUEST })).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it('should change failure to true and error to the error message when action.type is SIGNUP_ERROR', () => {
    expect(
      signUpReducer(undefined, { type: types.SIGNUP_ERROR, error: 'Failed to SignUp' }),
    ).toEqual({
      ...initialState,
      failure: true,
      error: 'Failed to SignUp',
    });
  });

  it('should change success to true when action.type is SIGNUP_SUCCESS', () => {
    expect(signUpReducer(undefined, { type: types.SIGNUP_SUCCESS })).toEqual({
      ...initialState,
      success: true,
    });
  });
});

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

const foo = () => {};
describe('The signUp Form', () => {
  it('Should render without crashing', () => {
    const home = shallow(
      <SignUpForm verifyPassword={foo} onError={false} isFetching={false} onSubmit={foo} />,
    );
    expect(home.find('input').length).toEqual(4);
    expect(home.find('button').length).toEqual(3);
  });
});

describe('The SignUp Container', () => {
  const store = createStore(reducers, {}, applyMiddleware());
  it('contains the nav bar component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('NavBar').length).toEqual(1);
  });

  it('contains the one footer component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('Footer').length).toEqual(1);
  });

  it('contains the signUp form component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('SignUpForm').length).toEqual(1);
  });

  it('does not contain the success message component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('ConfirmEmail').length).toEqual(0);
  });

  it('does not contain the error message component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('SignupError').length).toEqual(0);
  });
});
