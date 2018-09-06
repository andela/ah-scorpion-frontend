import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../../containers/SignUp';
import SignUpForm from '../../components/SignUpForm';
import reducers from '../../reducers/index';

Enzyme.configure({ adapter: new Adapter() });

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
