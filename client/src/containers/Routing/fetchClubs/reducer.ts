import {
  FETCH_CLUBS_REQUEST,
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_FAILURE,
  FetchClubsAction,
} from './action.type';
import { Club } from 'types/club.types';

type State = {
  clubs?: [Club?];
  loading: boolean;
  error: string | null;
};

const initialState: State = { clubs: [], loading: false, error: null };

export default (state = initialState, action: FetchClubsAction) => {
  console.log(action);
  switch (action.type) {
    case FETCH_CLUBS_REQUEST:
      return { loading: true };
    case FETCH_CLUBS_SUCCESS:
      return {
        clubs: [action.payload],
        loading: false,
      };
    case FETCH_CLUBS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
