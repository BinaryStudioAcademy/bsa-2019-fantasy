import { Thunky } from 'store/types';

export const SET_TEST_RESULT = 'TEST_ACTION:SET_TEST_RESULT';

type SetTestResult = {
  type: typeof SET_TEST_RESULT;
  payload: any;
};

export type TestAction = SetTestResult;
export type AsyncTestAction = Thunky<TestAction>;
