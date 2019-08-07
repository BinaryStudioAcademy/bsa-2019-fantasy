import * as testService from '../../services/testService';
import {
    SET_TEST_RESULT
} from './actionTypes';

const getTestResult = value => ({
    type: SET_TEST_RESULT,
    payload: value
});

export const testAction = () => async (dispatch) => {
    const result = await testService.getTestResult();
    const testValue = result.length && result[0].value
    dispatch(getTestResult(testValue));
};