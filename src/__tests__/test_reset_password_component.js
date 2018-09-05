import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { MemoryRouter } from 'react-router-dom';
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
describe('<ResetForm />', () => {
  it('should render itself and subcomponents and change state', () => {
    const { enzymeWrapper } = setup(ResetForm);
    expect(enzymeWrapper.find('input').length).toEqual(1);
  });
});
