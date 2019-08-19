import { GameweekType } from 'types/gameweek.type';
import { GameweekHistoryType } from 'types/gameweekHistory.type';
import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_FAILURE,
  FetchGameweeksAction,
} from './action.type';

type State = {
  gameweeks: GameweekType[];
  gameweeks_history: GameweekHistoryType[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  gameweeks: [],
  gameweeks_history: [],
  loading: false,
  error: null,
};

export default (state = initialState, action: FetchGameweeksAction) => {
  switch (action.type) {
    case FETCH_GAMEWEEKS_REQUEST:
      return { ...state, loading: true };

    case FETCH_GAMEWEEKS_SUCCESS:
      return {
        ...state,
        gameweeks: action.payload,
        loading: false,
      };

    case FETCH_GAMEWEEKS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_GAMEWEEKS_HISTORY_REQUEST:
      return { ...state, loading: true };

    case FETCH_GAMEWEEKS_HISTORY_SUCCESS:
      return {
        ...state,
        gameweeks_history: action.payload,
        loading: false,
      };

    case FETCH_GAMEWEEKS_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
