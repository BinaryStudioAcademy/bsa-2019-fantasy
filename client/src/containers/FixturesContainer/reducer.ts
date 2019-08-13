import {
  SET_GAMEWEEKS,
  SET_GAMES,
  setGamesAction,
  setGameweekAction,
} from './action.type';

import { GameweeksType, FixturesItemType } from 'types/fixtures.types';

type State = {
  gameweeks?: GameweeksType;
  games?: [FixturesItemType];
};

const initialState: State = {};

export default (state = initialState, action: setGamesAction | setGameweekAction) => {
  switch (action.type) {
    case SET_GAMEWEEKS:
      return { ...state, gameweeks: action.payload };
    case SET_GAMES:
      return { ...state, games: action.payload };
    default:
      return state;
  }
};
