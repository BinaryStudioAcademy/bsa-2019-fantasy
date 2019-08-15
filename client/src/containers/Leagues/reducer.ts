import {
  CreateLeagueAction,
  SetLeaguesAction,
  SET_IS_LOADING,
  CREATE_LEAGUE_SUCCESS,
  CREATE_LEAGUE_FAILURE,
  SET_USER_LEAGUES,
} from './action.types';

type State = {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  leagues?: any
};

const initialState: State = { isLoading: false, error: null, success: null };

export default (state = initialState, action: CreateLeagueAction | SetLeaguesAction ) => {
  switch (action.type) {
    case CREATE_LEAGUE_SUCCESS:
      return {
        ...state,
        success: action.payload.message,
        error: null,
        isLoading: false,
      };
    case CREATE_LEAGUE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        success: null,
        isLoading: false,
      };
    case SET_USER_LEAGUES:
      return { ...state, leagues: action.payload };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
