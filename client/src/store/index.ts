import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
// import { composeWithDevTools } from 'redux-devtools-extension';

import testReducer from '../containers/Test/reducer';
import profileReducer from '../containers/Profile/reducer';
import playersReducer from 'containers/Players/reducer';
import fixturesReducer from '../containers/FixturesContainer/reducer';
import clubsReducer from 'containers/Routing/fetchClubs/reducer';

export const history = createBrowserHistory();

const initialState = {};

const middlewares = [thunk, routerMiddleware(history)];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const reducers = {
  test: testReducer,
  profile: profileReducer,
  //clubs: clubsReducer,
  players: playersReducer,
  fixtures: fixturesReducer,
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
