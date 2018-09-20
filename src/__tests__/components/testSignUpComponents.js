import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import reducers from '../../reducers/index';
import SignUp from '../../containers/SignUp';
import SignUpForm from '../../components/SignUpForm';

Enzyme.configure({ adapter: new Adapter() });

const foo = () => {};

describe('The signUp Form', () => {
  it('Should render without crashing', () => {
    const home = shallow(
      <SignUpForm verifyPassword={foo} onError={false} isFetching={false} onSubmit={foo} />,
    );
    expect(home.find('input').length).toEqual(4);
    expect(home.find('button').length).toEqual(1);
  });
});

describe('The SignUp Container', () => {
  const store = createStore(reducers, {}, applyMiddleware());
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp success={false} />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('does not contain the success message component on initialization', () => {
    expect(wrapper.find('ConfirmEmail').length).toEqual(0);
  });

  it('does not contain the error message component on initialization', () => {
    expect(wrapper.find('SignupError').length).toEqual(0);
  });
});
