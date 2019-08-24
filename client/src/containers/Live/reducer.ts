import {
  LOAD_CURRENT_GAME_REQUEST,
  LOAD_CURRENT_GAME_SUCCESS,
  LOAD_CURRENT_GAME_FAILURE,
  LoadCurrentGameAction,
  AsyncLoadCurrentGameAction,
} from './action.type';
import { Game } from 'types/game.types';

type State = {
  current?: Game;
  next?: Game;
  loading: boolean;
  error?: string;
};

const initialState: State = {
  current: undefined,
  next: undefined,
  loading: false,
  error: undefined,
};

export default (state = initialState, action: LoadCurrentGameAction) => {
  switch (action.type) {
    case LOAD_CURRENT_GAME_REQUEST:
      return { ...state, loading: true };
    case LOAD_CURRENT_GAME_SUCCESS:
      return { ...state, ...action.payload };
    case LOAD_CURRENT_GAME_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
