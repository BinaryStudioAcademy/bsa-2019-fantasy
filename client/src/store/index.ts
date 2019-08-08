import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
// import { composeWithDevTools } from 'redux-devtools-extension';

import testReducer from '../containers/Test/reducer';
import profileReducer from '../containers/Profile/reducer';

export const history = createBrowserHistory();

const initialState = {};

const middlewares = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(applyMiddleware(...middlewares));

const reducers = {
    test: testReducer,
    profile: profileReducer,
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
