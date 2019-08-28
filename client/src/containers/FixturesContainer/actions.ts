import * as gameweekService from 'services/gameweekService';
import {
  SET_GAMEWEEKS,
  SET_GAMES,
  SET_GAME_DETAILS,
  SET_IS_LOADING,
  setGameweekAction,
  setGamesAction,
  setGameDetailsAction,
  AsyncSetGameweekAction,
  AsyncSetGamesAction,
  AsyncSetGameDetailsAction,
} from './action.type';

import { FixturesItemType, GamesDetailsType } from 'types/fixtures.types';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

const setGameweeks = (gameweeks: GameweekHistoryType[]): setGameweekAction => ({
  type: SET_GAMEWEEKS,
  payload: gameweeks,
});

const setGames = (games: [FixturesItemType]): setGamesAction => ({
  type: SET_GAMES,
  payload: games,
});

const setGameDetails = (gamesDetails: GamesDetailsType): setGameDetailsAction => ({
  type: SET_GAME_DETAILS,
  payload: gamesDetails,
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

export const loadGameDetailsAction = (id: string): AsyncSetGameDetailsAction => async (
  dispatch,
) => {
  const result = await gameweekService.getGameDetailsById(id);
  dispatch(setGameDetails(result));
};
