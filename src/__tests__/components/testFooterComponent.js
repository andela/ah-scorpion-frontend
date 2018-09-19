import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../components/Footer';

Enzyme.configure({ adapter: new Adapter() });

describe('The Footer', () => {
  describe('the Footer Renders correctly', () => {
    it('should render children', () => {
      const wrapper = mount(
        <Footer />,
      );
      expect(wrapper.find('p').get(0)).toBeDefined();
      expect(wrapper.find('.footer').get(0)).toBeDefined();
      expect(wrapper.find('.row').get(0)).toBeDefined();
      expect(wrapper.find('.col-md-12').get(0)).toBeDefined();
      wrapper.unmount();
    });
  });
});
