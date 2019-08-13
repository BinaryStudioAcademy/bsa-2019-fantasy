import * as gameweekService from 'services/gameweekService';
import {
  SET_GAMEWEEKS,
  SET_GAMES,
  setGameweekAction,
  setGamesAction,
  AsyncSetGameweekAction,
  AsyncSetGamesAction,
} from './action.type';

import { GameweeksType, FixturesItemType } from 'types/fixtures.types';

const setGameweeks = (gameweeks: GameweeksType): setGameweekAction => ({
  type: SET_GAMEWEEKS,
  payload: gameweeks,
});

const setGames = (games: [FixturesItemType]): setGamesAction => ({
  type: SET_GAMES,
  payload: games,
});

export const loadGameweeksAction = (): AsyncSetGameweekAction => async (dispatch) => {
  const result = await gameweekService.getGameweeks();
  dispatch(setGameweeks(result));
};

export const loadGamesAction = (id: string): AsyncSetGamesAction => async (dispatch) => {
  const result = await gameweekService.getGamesById(id);
  dispatch(setGames(result));
};
