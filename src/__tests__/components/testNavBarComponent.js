import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import NavBar from '../../components/NavBar';

Enzyme.configure({ adapter: new Adapter() });

describe('The NavBar', () => {
  describe('the NavBar Renders correctly', () => {
    it('should render children', () => {
      const wrapper = mount(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>,
      );
      expect(wrapper.find('.navbar-brand').get(0)).toBeDefined();
      expect(wrapper.find('.navbar-toggler').get(0)).toBeDefined();
      expect(wrapper.find('.navbar-toggler-icon').get(0)).toBeDefined();
      expect(wrapper.find('.navbar-collapse').get(0)).toBeDefined();
      wrapper.unmount();
    });
  });
});
