import updateFavorite from '../../actions/updateFavorite';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('article favouriting actions', () => {
  it('should updates favourite status', async (done) => {
    const value = updateFavorite('anjanncncja');
    console.log(value);
    done();
  });
});
