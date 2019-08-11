import { Thunky } from 'store/types';

export const LOAD_GAMEWEEKS = 'GAMEWEEK_ACTION:LOAD_GAMEWEEKS';
export const SET_GAMEWEEKS = 'GAMEWEEK_ACTION:SET_GAMEWEEKS';
export const LOAD_GAMES = 'GAME_ACTIONS:LOAD_GAME';
export const SET_GAMES = 'GAME_ACTIONS:SET_GAME';

type LoadGameweeks = {
  type: typeof LOAD_GAMEWEEKS;
  payload: any;
};

type SetGameweeks = {
  type: typeof SET_GAMEWEEKS;
  payload: any;
};

export type GameweekAction = LoadGameweeks;
export type setGameweekAction = SetGameweeks;
export type AsyncGameweekAction = Thunky<GameweekAction>;
