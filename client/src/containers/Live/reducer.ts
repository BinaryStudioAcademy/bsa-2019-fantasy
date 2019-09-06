import {
  LOAD_CURRENT_GAME_REQUEST,
  LOAD_CURRENT_GAME_SUCCESS,
  LOAD_CURRENT_GAME_FAILURE,
  LoadCurrentGameAction,
  AsyncLoadCurrentGameAction,
  SET_LIVE_STATUS,
  SetLiveStatusAction,
  LiveStatusObject,
  ADD_LIVE_EVENT,
  AddLiveEventAction,
  LOAD_LAST_GAMES_REQUEST,
  LOAD_LAST_GAMES_SUCCESS,
  LOAD_LAST_GAMES_FAILURE,
  LoadLastGamesAction,
} from './action.type';
import { Game } from 'types/game.types';
import produce from 'immer';
import { createComment } from './helpers/createComment';

type State = {
  current: LiveStatusObject;
  next?: Game;
  loading: boolean;
  error?: string;
  lastGames: Game[];
};

const initialState: State = {
  current: {
    gameStarted: false,
    homeClubId: undefined,
    awayClubId: undefined,
    score: undefined,
    elapsed: undefined,
    events: [],
    isSimulation: undefined,
  },
  next: undefined,
  lastGames: [],
  loading: false,
  error: undefined,
};

export default (
  state = initialState,
  action:
    | LoadCurrentGameAction
    | SetLiveStatusAction
    | AddLiveEventAction
    | LoadLastGamesAction,
) => {
  switch (action.type) {
    case LOAD_CURRENT_GAME_REQUEST:
      return { ...state, loading: true };
    case LOAD_CURRENT_GAME_SUCCESS:
      return { ...state, next: action.payload.next };
    case LOAD_CURRENT_GAME_FAILURE:
      return { ...state, error: action.payload };
    case SET_LIVE_STATUS:
      return { ...state, current: { ...state.current, ...action.payload } };
    case ADD_LIVE_EVENT:
      return produce(state, (draft) => {
        draft.current.elapsed = action.payload.elapsed;
        draft.current.score = action.payload.score || draft.current.score;
        if (action.payload.name === 'startGame') draft.current.events = [];
        draft.current.events.push(action.payload);
      });
    case LOAD_LAST_GAMES_REQUEST:
      return { ...state, loading: true };
    case LOAD_LAST_GAMES_SUCCESS:
      return { ...state, lastGames: action.payload };
    case LOAD_LAST_GAMES_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
