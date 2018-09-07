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
  it('Should render without crashing', () => {
    const home = mount(<MemoryRouter><Homepage /></MemoryRouter>);
    expect(home.find('div').length).toEqual(49);
  });

  const store = createStore(reducers, {}, applyMiddleware());
  it('contains the footer component on initialization', () => {
    const wrapper = mount(<MemoryRouter><Homepage store={store} success={false} /></MemoryRouter>);
    expect(wrapper.find('HomeFooter').length).toEqual(1);
  });

  it('contains three images on initialization', () => {
    const wrapper = mount(<MemoryRouter><Homepage store={store} success={false} /></MemoryRouter>);
    expect(wrapper.find('img').length).toEqual(3);
  });

  it('initializes the Benefits components', () => {
    const wrapper = mount(<MemoryRouter><Homepage store={store} success={false} /></MemoryRouter>);
    expect(wrapper.find('RenderBenefits').length).toEqual(1);
  });

  it('initializes the Features components', () => {
    const wrapper = mount(<MemoryRouter><Homepage store={store} success={false} /></MemoryRouter>);
    expect(wrapper.find('RenderFeatures').length).toEqual(1);
  });

  it('initializes the Testimonials components', () => {
    const wrapper = mount(<MemoryRouter><Homepage store={store} success={false} /></MemoryRouter>);
    expect(wrapper.find('RenderTestimonials').length).toEqual(1);
  });
});
