/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../../containers/Homepage';
import reducers from '../../reducers/index';

Enzyme.configure({ adapter: new Adapter() });

describe('The Home Page', () => {
  const store = createStore(reducers, {}, applyMiddleware());
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<MemoryRouter><Homepage store={store} success={false} /></MemoryRouter>);
  });

  it('Should render without crashing', () => {
    expect(wrapper.find('div').length).toEqual(49);
  });

  it('contains the footer component on initialization', () => {
    expect(wrapper.find('HomeFooter').length).toEqual(1);
  });

  it('contains three images on initialization', () => {
    expect(wrapper.find('img').length).toEqual(3);
  });

  it('initializes the Benefits components', () => {
    expect(wrapper.find('RenderBenefits').length).toEqual(1);
  });

  it('initializes the Features components', () => {
    expect(wrapper.find('RenderFeatures').length).toEqual(1);
  });

  it('initializes the Testimonials components', () => {
    expect(wrapper.find('RenderTestimonials').length).toEqual(1);
  });
});
