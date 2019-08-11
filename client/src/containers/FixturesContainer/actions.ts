import * as gameweekService from 'services/gameweekService';
import {
  LOAD_GAMEWEEKS,
  SET_GAMEWEEKS,
  SET_GAMES,
  setGameweekAction,
  GameweekAction,
  AsyncGameweekAction,
} from './action.type';

const setGameweeks = (gameweeks: any): any => ({
  type: SET_GAMEWEEKS,
  payload: gameweeks,
});

const setGames = (games: any): any => ({
  type: SET_GAMES,
  payload: games,
});

export const loadGameweeksAction = (): any => async (dispatch: any) => {
  const result = await gameweekService.getGameweeks();
  dispatch(setGameweeks(result));
};

export const loadGamesAction = (id: any): any => async (dispatch: any) => {
  const result = await gameweekService.getGamesById(id);
  dispatch(setGames(result));
};
