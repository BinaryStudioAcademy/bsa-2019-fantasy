import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FetchPlayersAction,
  FETCH_PLAYER_DIALOG_CONTENT_REQUEST,
  FETCH_PLAYER_DIALOG_CONTENT_SUCCESS,
  FetchaDataForPlayerAction,
} from './action.type';
import { Fixture } from 'types/fixture.types';
import { History } from 'types/history.types';

type State = {
  players?: any;
  loading: boolean;
  error: string | null;
  playerData: { history: History; fixtures: [Fixture] } | {};
  dialogLoading: boolean;
};

const initialState: State = {
  players: [],
  loading: false,
  error: null,
  playerData: {},
  dialogLoading: false,
};

export default (
  state = initialState,
  action: FetchPlayersAction | FetchaDataForPlayerAction,
) => {
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
    case FETCH_PLAYER_DIALOG_CONTENT_REQUEST:
      return { ...state, dialogLoading: true };
    case FETCH_PLAYER_DIALOG_CONTENT_SUCCESS:
      return {
        ...state,
        playerData: action.payload,
        dialogLoading: false,
      };
    default:
      return state;
  }
};
