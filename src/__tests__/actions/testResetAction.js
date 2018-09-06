import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import resetAction from '../../actions/resetAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const dataEmail = { email: 'ruthnwaiganjo@gmail.com' };

const ResetActionResponse = {
  resetData: dataEmail,
};

describe('reset action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create reset Action', () => {
    it('Should dispatch reset action', async (done) => {
      moxios.stubRequest('../api/resetAction', { response: dataEmail });
      const returnedAction = [];
      const store = mockStore({});
      await store.dispatch(
        resetAction({
          ...ResetActionResponse.resetData,
        }),
      );
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
