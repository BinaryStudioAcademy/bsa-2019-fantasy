import {
  SET_GAMEWEEKS_HISTORY,
  SET_TEAM_HISTORY,
  SET_IS_LOADING,
  setGameweekHistoryAction,
  setTeamHistoryAction,
} from './action.type';

import { LOCAL_GameweekHistoryType } from './types';

type State = {
  gameweeksHistory: LOCAL_GameweekHistoryType[];
  teamHistory?: any;
  isLoading: boolean;
};

const initialState: State = {
  gameweeksHistory: [],
  teamHistory: [],
  isLoading: true,
};

export default (
  state = initialState,
  action: setGameweekHistoryAction | setTeamHistoryAction,
) => {
  switch (action.type) {
    case SET_GAMEWEEKS_HISTORY:
      return { ...state, gameweeksHistory: action.payload };
    case SET_TEAM_HISTORY:
      return { ...state, teamHistory: action.payload };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
