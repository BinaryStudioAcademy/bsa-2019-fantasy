import {
  SET_GAMEWEEKS,
  SET_GAMES,
  SET_IS_LOADING,
  setGamesAction,
  setGameweekAction,
} from './action.type';

import { GameweeksType, FixturesItemType } from 'types/fixtures.types';

type State = {
  gameweeks?: GameweeksType;
  games?: [FixturesItemType];
  isLoading: boolean;
};

const initialState: State = { isLoading: true };

export default (state = initialState, action: setGamesAction | setGameweekAction) => {
  switch (action.type) {
    case SET_GAMEWEEKS:
      return { ...state, gameweeks: action.payload };
    case SET_GAMES:
      return { ...state, games: action.payload };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
