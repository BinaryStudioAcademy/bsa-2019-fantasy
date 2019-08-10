import { SET_TEST_RESULT, TestAction } from './action.type';

type State = {
  testRes?: any;
};

const initialState: State = {};

export default (state = initialState, action: TestAction) => {
  switch (action.type) {
    case SET_TEST_RESULT:
      return { ...state, testRes: action.payload };
    default:
      return state;
  }
};
