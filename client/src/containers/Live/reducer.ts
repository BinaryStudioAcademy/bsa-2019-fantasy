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
} from './action.type';
import { Game } from 'types/game.types';

type State = {
  current: LiveStatusObject;
  next?: Game;
  loading: boolean;
  error?: string;
};

const initialState: State = {
  current: {
    gameStarted: false,
    homeClubId: undefined,
    awayClubId: undefined,
    score: undefined,
    elapsed: undefined,
    events: [],
  },
  next: undefined,
  loading: false,
  error: undefined,
};

export default (
  state = initialState,
  action: LoadCurrentGameAction | SetLiveStatusAction | AddLiveEventAction,
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
      const newState = { ...state };
      newState.current.elapsed = action.payload.elapsed;
      newState.current.events.push(action.payload);
      newState.current.score = action.payload.score || newState.current.score;
      return newState;
    default:
      return state;
  }
};
