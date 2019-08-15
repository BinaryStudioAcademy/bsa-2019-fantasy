import {
  CreateLeagueAction,
  SET_IS_LOADING,
  CREATE_LEAGUE_SUCCESS,
  CREATE_LEAGUE_FAILURE,
} from './action.types';

type State = {
  isLoading: boolean;
  error: string | null;
  success: string | null;
};

const initialState: State = { isLoading: false, error: null, success: null };

export default (state = initialState, action: CreateLeagueAction) => {
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
