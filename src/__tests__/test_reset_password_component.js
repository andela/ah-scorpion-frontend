import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import reducers from '../reducers';
import ResetForm from '../containers/ResetPassword';

const store = createStore(reducers, {}, applyMiddleware(Thunk));

Enzyme.configure({ adapter: new Adapter() });

function setup(Func) {
  const reset = jest.fn(() => Promise.resolve('it works'));
  const props = {
    reset,
  };

  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Func {...props} />
      </MemoryRouter>
    </Provider>,
  );

  return {
    props,
    enzymeWrapper,
  };
}
describe('Test the reset password component', () => {
  const { enzymeWrapper } = setup(ResetForm);
  describe('<ResetForm />', () => {
    it('It should should the reset form component with the input and button', () => {
      expect(enzymeWrapper.find('input').length).toEqual(1);
      enzymeWrapper
        .find('input')
        .simulate('change', { target: { value: 'ruthnwaiganjo@gmail.com' } });
      expect(
        enzymeWrapper
          .find('button')
          .at(1)
          .simulate('click'),
      );
    });
  });
  describe('<ResetForm />', () => {
    it('It should send the email', () => {
      enzymeWrapper.setState({
        data: {
          email: 'ruthnwaiganjo@gmail.com',
        },
      });
      enzymeWrapper.find('.btn-primary').simulate('click');
      expect(enzymeWrapper.instance().onSubmit).toHaveBeenCalled;
    });
  });
});
