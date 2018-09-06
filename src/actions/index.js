import { TEST_REDUX } from "./types";

const testStore = data => ({ type: TEST_REDUX, payload: data });

export default testStore;
