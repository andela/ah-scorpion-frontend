import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import React from 'react';
import LoginForm from '../../components/LoginForm';

Enzyme.configure({ adapter: new Adapter() });

function setup(Func) {
  const submit = jest.fn(() => Promise.resolve('it works'));
  const props = {
    submit,
  };

  const enzymeWrapper = mount(
    <MemoryRouter>
      <Func {...props} />
    </MemoryRouter>,
  );

  return {
    props,
    enzymeWrapper,
  };
}
describe('<LoginForm />', () => {
  it('should render itself and subcomponents and change state', () => {
    const { enzymeWrapper } = setup(LoginForm);
    expect(enzymeWrapper.find('input').length).toEqual(2);
    enzymeWrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { name: 'email', value: 'sn@stuff.com' } });
  });
});

describe('<LoginForm/>', () => {
  it('should login a user', () => {
    const { enzymeWrapper } = setup(LoginForm);
    enzymeWrapper.setState({
      data: {
        email: 'sn@gmail.com',
        password: 'password1234',
      },
    });
    enzymeWrapper.find('form').simulate('submit');
    expect(enzymeWrapper.instance().onSubmit).toHaveBeenCalled;
  });
});
