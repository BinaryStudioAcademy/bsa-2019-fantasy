import {
  SetLeaguesAction,
  SearchLeaguesAction,
  SET_USER_LEAGUES,
  SET_LEAGUES_SUGGESTIONS,
  SET_LOADING,
  RESET_LEAGUES_DATA,
  CREATE_LEAGUE_FAILURE,
  CREATE_LEAGUE_SUCCESS,
} from './action.types';

type State = {
  leagues?: any;
  suggestions?: any;
  error: string | null;
  success: string | null;
  isLoading: boolean;
};

const initialState: State = {
  suggestions: [],
  error: null,
  success: null,
  isLoading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_LEAGUES:
      return { ...state, leagues: action.payload };
    case SET_LEAGUES_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    case SET_LOADING:
      return { ...state, success: null, error: null, isLoading: action.payload };
    case CREATE_LEAGUE_FAILURE:
      return { ...state, success: null, error: action.payload, isLoading: false };
    case CREATE_LEAGUE_SUCCESS:
      return { ...state, success: action.payload, error: null, isLoading: false };
    case RESET_LEAGUES_DATA:
      return { ...state, success: null, error: null };
    default:
      return state;
  }
};
