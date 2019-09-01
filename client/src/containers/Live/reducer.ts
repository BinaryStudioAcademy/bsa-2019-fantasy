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
import produce from 'immer';

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
      return produce(state, (draft) => {
        draft.current.elapsed = action.payload.elapsed;
        draft.current.score = action.payload.score || draft.current.score;
        draft.current.events.push(action.payload);
      });
    default:
      return state;
  }
};
