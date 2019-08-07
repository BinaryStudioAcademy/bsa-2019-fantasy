import {
    SET_TEST_RESULT
} from './actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_TEST_RESULT:
            return { ...state, testRes: action.payload };
        default:
            return state;
    }
};
