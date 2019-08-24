import * as gameweekService from 'services/gameweekService';
import {
  SET_GAMEWEEKS,
  SET_GAMES,
  SET_IS_LOADING,
  setGameweekAction,
  setGamesAction,
  AsyncSetGameweekAction,
  AsyncSetGamesAction,
} from './action.type';

import { FixturesItemType } from 'types/fixtures.types';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

const setGameweeks = (gameweeks: GameweekHistoryType[]): setGameweekAction => ({
  type: SET_GAMEWEEKS,
  payload: gameweeks,
});

const setGames = (games: [FixturesItemType]): setGamesAction => ({
  type: SET_GAMES,
  payload: games,
});

const setIsLoading = (isLoading: boolean): setGamesAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const loadGameweeksAction = (): AsyncSetGameweekAction => async (dispatch) => {
  const result = await gameweekService.getGameweeks();
  dispatch(setGameweeks(result));
};

export const loadGamesAction = (id: number): AsyncSetGamesAction => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await gameweekService.getGamesById(id);
  dispatch(setGames(result));
  dispatch(setIsLoading(false));
};
