import {
  SetLeaguesAction,
  SearchLeaguesAction,
  SET_USER_LEAGUES,
  SET_LEAGUES_SUGGESTIONS,
} from './action.types';

type State = {
  leagues?: any;
  suggestions?: any;
};

const initialState: State = {
  suggestions: [],
};

export default (state = initialState, action: SetLeaguesAction | SearchLeaguesAction) => {
  switch (action.type) {
    case SET_USER_LEAGUES:
      return { ...state, leagues: action.payload };
    case SET_LEAGUES_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    default:
      return state;
  }
};
