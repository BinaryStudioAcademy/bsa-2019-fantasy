import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import testReducer from 'containers/Test/reducer';
import transferReducer from 'containers/Transfers/reducer';
import profileReducer from 'containers/Profile/reducer';
import playersReducer from 'containers/Players/reducer';
import fixturesReducer from 'containers/FixturesContainer/reducer';
import clubsReducer from 'containers/Routing/fetchClubs/reducer';
import gameweeksReducer from 'containers/Routing/fetchGameweeks/reducer';
import gameweekHistoryReducer from 'containers/GameweekHistory/reducer';
import gameweeksEntryHistoryReducer from 'containers/EntryHistory/reducer';
import leagueReducer from 'containers/Leagues/reducer';
import currentGameReducer from 'containers/Live/reducer';

import playerSelectionReducer from 'components/PlayersSelection/reducer';
import notificationsReducer from 'components/Notifications/reducer';
import topTransfersReducer from 'components/TopTransfers/reducer';

export const history = createBrowserHistory();

const initialState = {};

const middlewares = [thunk, routerMiddleware(history)];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const reducers = {
  test: testReducer,
  profile: profileReducer,
  clubs: clubsReducer,
  players: playersReducer,
  fixtures: fixturesReducer,
  playerSelection: playerSelectionReducer,
  gameweeks: gameweeksReducer,
  league: leagueReducer,
  currentGame: currentGameReducer,
  gameweekHistory: gameweekHistoryReducer,
  transfers: transferReducer,
  notifications: notificationsReducer,
  gameweeksEntryHistory: gameweeksEntryHistoryReducer,
  topTransfers: topTransfersReducer
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;