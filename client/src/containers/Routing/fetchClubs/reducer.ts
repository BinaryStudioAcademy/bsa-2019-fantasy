import {
  FETCH_CLUBS_REQUEST,
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_FAILURE,
  FetchClubsAction,
} from './action.type';
import { Club } from 'types/club.type';

type State = {
  clubs: Club[];
  loading: boolean;
  error: string | null;
};

const initialState: State = { clubs: [], loading: false, error: null };

export default (state = initialState, action: FetchClubsAction) => {
  switch (action.type) {
    case FETCH_CLUBS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CLUBS_SUCCESS:
      return {
        ...state,
        clubs: action.payload,
        loading: false,
      };
    case FETCH_CLUBS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
