import {
  SetLeaguesAction,
  SearchLeaguesAction,
  SET_USER_LEAGUES,
  SET_LEAGUES_SUGGESTIONS,
  SET_INVITATION_CODE,
  SET_LOADING,
  RESET_LEAGUES_DATA,
  CREATE_LEAGUE_FAILURE,
  CREATE_LEAGUE_SUCCESS,
  SetInvitationCode,
  CreateLeagueAction,
  ResetLeagueAction,
  JOIN_LEAGUE_SUCCESS,
  JoinLeagueAction,
} from './action.types';

type State = {
  leagues?: any;
  suggestions?: any;
  error: string | null;
  success: string | null;
  isLoading: boolean;
  code?: string;
};

const initialState: State = {
  suggestions: [],
  error: null,
  success: null,
  isLoading: false,
  code: '',
};

export default (
  state = initialState,
  action:
    | SetInvitationCode
    | SetLeaguesAction
    | SearchLeaguesAction
    | CreateLeagueAction
    | ResetLeagueAction
    | JoinLeagueAction,
) => {
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
      return { ...state, success: null, error: null, code: '' };
    case SET_INVITATION_CODE:
      return { ...state, code: action.payload };
    case JOIN_LEAGUE_SUCCESS:
      return { ...state, success: action.payload };
    default:
      return state;
  }
};
