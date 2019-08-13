import { Thunky } from 'store/types';

export const SET_GAMEWEEKS = 'GAMEWEEK_ACTION:SET_GAMEWEEKS';
export const SET_GAMES = 'GAME_ACTIONS:SET_GAME';

type SetGameweeks = {
  type: typeof SET_GAMEWEEKS;
  payload: any;
};

type SetGames = {
  type: typeof SET_GAMES;
  payload: any;
};

export type setGameweekAction = SetGameweeks;
export type setGamesAction = SetGames;
export type AsyncSetGameweekAction = Thunky<setGameweekAction>;
export type AsyncSetGamesAction = Thunky<setGamesAction>;
