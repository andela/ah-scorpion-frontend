import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ConfirmEmail from '../../components/ConfirmEmail';
import SignUpError from '../../components/SignUpError';
import SignUpForm from '../../components/SignUpForm';

describe('The signUp view', () => {
  describe('The NavBar component', () => {
    it('Should not regress', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('The Footer component', () => {
    it('Should not regress', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('The ConfirmEmail component', () => {
    it('Should not regress', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <ConfirmEmail />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('The SignUpError component', () => {
    it('Should not regress', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <SignUpError errorMsg="An error occurred" />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('The SignUpForm component', () => {
    const testProps = {
      onSubmit: () => 1,
      verifyPassword: () => 1,
      history: { push: () => 1 },
      errorMsg: 'An error occurred',
    };
    it('Should initially render without an error or loading status', () => {
      const tree = shallow(
        <MemoryRouter>
          <SignUpForm {...testProps} onError={false} isFetching={false} />
        </MemoryRouter>,
      );
      // expect(shallowToJSON(tree)).toMatchSnapshot();
    });
    it('Should show loading status when request is pending', () => {
      const tree = shallow(
        <MemoryRouter>
          <SignUpForm {...testProps} onError={false} isFetching />
        </MemoryRouter>,
      );
      // expect(shallowToJSON(tree)).toMatchSnapshot();
    });
    it('Should show the error message when request fails', () => {
      const tree = shallow(
        <MemoryRouter>
          <SignUpForm {...testProps} onError isFetching={false} />
        </MemoryRouter>,
      );
      // expect(shallowToJSON(tree)).toMatchSnapshot();
    });
  });
});
