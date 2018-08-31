import { TEST_REDUX } from "../actions/types";

const initialState = {
  test: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_REDUX:
      return { ...state, test: action.payload };
    default:
      return state;
  }
}
