import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import SignUp from '../containers/SignUp';
import SignUpForm from '../components/SignupForm';
import reducers from '../reducers';

describe('The Login Form', () => {
  it('Should render without crashing', () => {
    const home = shallow(<SignUpForm />);
    expect(home.find('input').length)
      .toEqual(4);
    expect(home.find('button').length)
      .toEqual(3);
  });
});

describe('The Login Container', () => {
  const store = createStore(reducers, {}, applyMiddleware());
  it('contains the nav bar component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('NavBar').length)
      .toEqual(1);
  });

  it('contains the one footer component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('Footer').length)
      .toEqual(1);
  });

  it('contains the signup form component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('SignUpForm').length)
      .toEqual(1);
  });

  it('does not contain the success message component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('ConfirmEmail').length)
      .toEqual(0);
  });


  it('does not contain the error message component on initialization', () => {
    const wrapper = mount(<SignUp store={store} success={false} />);
    expect(wrapper.find('SignupError').length)
      .toEqual(0);
  });
});
