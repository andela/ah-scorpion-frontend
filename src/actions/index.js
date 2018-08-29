import { TEST_REDUX } from './types';

export const testStore = data => {
  return { type: TEST_REDUX, payload: data };
};
