import { Thunky } from 'store/types';

export const SET_GAMEWEEKS = 'GAMEWEEK_ACTION:SET_GAMEWEEKS';
export const SET_GAMES = 'GAME_ACTIONS:SET_GAME';
export const SET_IS_LOADING = 'GAME_ACTION:SET_IS_LOADING';

type SetGameweeks = {
  type: typeof SET_GAMEWEEKS;
  payload: any;
};

type SetGames = {
  type: typeof SET_GAMES;
  payload: any;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type setGameweekAction = SetGameweeks;
export type setGamesAction = SetGames | SetLoading;
export type AsyncSetGameweekAction = Thunky<setGameweekAction>;
export type AsyncSetGamesAction = Thunky<setGamesAction>;
