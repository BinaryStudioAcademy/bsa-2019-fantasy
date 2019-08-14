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
        success: 'Successfully created a new league!',
        isLoading: false,
      };
    case CREATE_LEAGUE_FAILURE:
      return {
        ...state,
        error: 'Something went wrong!',
        isLoading: false,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
