import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FetchGameweeksAction,
} from './action.type';

type State = {
  gameweeks?: any;
  loading: boolean;
  error: string | null;
};

const initialState: State = { gameweeks: [], loading: false, error: null };

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
    default:
      return state;
  }
};
