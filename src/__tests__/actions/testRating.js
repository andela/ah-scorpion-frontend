import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rateArticle } from '../../actions/rateAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const data = {
  stars: 0,
};
const Response = {
  RateData: data,
  status: 'success',
};

describe('rate action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create rate Action', () => {
    it('Should dispatch rate action', async (done) => {
      moxios.stubRequest('api/v1/slug/rating', {
        status: 200,
        response: data,
      });
      const returnedAction = [];

      const store = mockStore({});
      await store.dispatch(
        rateArticle({
          ...Response.RateData,
        }),
      );
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
