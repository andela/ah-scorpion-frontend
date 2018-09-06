import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reset from '../actions/resetPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userEmail = { user: { email: 'ruthnwaiganjo@gmail.com' } };

const ResetResponse = {
  resetData: userEmail,
};

describe('reset password action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create reset password Action', () => {
    it('Should dispatch reset action', async (done) => {
      moxios.stubRequest('../api/reset', { response: userEmail });
      const returnedAction = [
        {
          type: 'RESET_REQUEST_START',
        },
      ];

      const store = mockStore({});
      await store.dispatch(
        reset({
          ...ResetResponse.resetData,
        }),
      );
      expect(store.getActions()).toEqual(returnedAction);
      done();
    });
  });
});
