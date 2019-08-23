import { GameweekType } from 'types/gameweek.type';
import {
  GameweekHistoryType,
  GameweekHistoryResultsType,
  GameweekUserRankingType,
} from 'types/gameweekHistory.type';
import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE,
  FETCH_GAMEWEEK_USER_RANKING_REQUEST,
  FETCH_GAMEWEEK_USER_RANKING_SUCCESS,
  FETCH_GAMEWEEK_USER_RANKING_FAILURE,
  FetchGameweeksAction,
} from './action.type';

type State = {
  gameweeks: GameweekType[];
  gameweeks_history: GameweekHistoryType[];
  gameweeks_results: GameweekHistoryResultsType[] | null;
  user_rank: GameweekUserRankingType | null;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  gameweeks: [],
  gameweeks_history: [],
  gameweeks_results: null,
  user_rank: null,
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
    case FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS:
      return {
        ...state,
        gameweeks_results: action.payload,
        loading: false,
      };
    case FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_GAMEWEEK_USER_RANKING_REQUEST:
      return { ...state, loading: true };

    case FETCH_GAMEWEEK_USER_RANKING_SUCCESS:
      return {
        ...state,
        user_rank: action.payload,
        loading: false,
      };
    case FETCH_GAMEWEEK_USER_RANKING_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
