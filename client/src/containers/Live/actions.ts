import * as testService from 'services/testService';
import { SET_TEST_RESULT, TestAction, AsyncTestAction } from './action.type';

const setTestResult = (value: any): TestAction => ({
  type: SET_TEST_RESULT,
  payload: value,
});

export const testAction = (): AsyncTestAction => async (dispatch) => {
  const result = await testService.getTestResult();
  const testValue = result.length && result[0].value;
  dispatch(setTestResult(testValue));
};
