import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FetchPlayersAction,
} from './action.type';

type State = {
  players?: any;
  loading: boolean;
  error: string | null;
};

const initialState: State = { players: [], loading: false, error: null };

export default (state = initialState, action: FetchPlayersAction) => {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.payload,
        loading: false,
      };
    case FETCH_PLAYERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
