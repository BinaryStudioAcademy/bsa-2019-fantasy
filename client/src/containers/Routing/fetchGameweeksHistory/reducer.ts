import {
  FETCH_GAMEWEEK_HISTORY_REQUEST,
  FETCH_GAMEWEEK_HISTORY_SUCCESS,
  FETCH_GAMEWEEK_HISTORY_FAILURE,
  FetchGameweekHistoryAction,
} from './action.type';

type State = {
  gameweeks?: any;
  loading: boolean;
  error: string | null;
};

const initialState: State = { gameweeks: [], loading: false, error: null };

export default (state = initialState, action: FetchGameweekHistoryAction) => {
  console.log(action);
  switch (action.type) {
    case FETCH_GAMEWEEK_HISTORY_REQUEST:
      return { ...state, loading: true };
    case FETCH_GAMEWEEK_HISTORY_SUCCESS:
      return {
        ...state,
        gameweeks: action.payload,
        loading: false,
      };
    case FETCH_GAMEWEEK_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
