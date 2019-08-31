import {
  SET_GAMEWEEKS_HISTORY,
  SET_TEAM_HISTORY,
  SET_IS_LOADING,
  SET_SUPER_CURRENT_GAMEWEEK,
  setGameweekHistoryAction,
  setTeamHistoryAction,
  SetSuperCurrentGameweekAction,
} from './action.type';

import { LOCAL_GameweekHistoryType } from './types';

type State = {
  gameweeksHistory: LOCAL_GameweekHistoryType[];
  teamHistory?: any;
  isLoading: boolean;
  superCurrentGameweek: number;
};

const initialState: State = {
  gameweeksHistory: [],
  teamHistory: [],
  isLoading: true,
  superCurrentGameweek: 1,
};

export default (
  state = initialState,
  action: setGameweekHistoryAction | setTeamHistoryAction | SetSuperCurrentGameweekAction,
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
    case SET_SUPER_CURRENT_GAMEWEEK:
      return {
        ...state,
        superCurrentGameweek: action.payload
      };
    default:
      return state;
  }
};
