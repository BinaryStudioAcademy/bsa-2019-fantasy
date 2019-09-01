import { Thunky } from 'store/types';
import { LOCAL_GameweekHistoryType } from './types';

export const SET_GAMEWEEKS_HISTORY = 'GAMEWEEK_HISTORY_ACTION:SET_GAMEWEEKS_HISTORY';
export const SET_TEAM_HISTORY = 'TEAM_HISTORY_ACTIONS:SET_TEAM_HISTORY';
export const SET_IS_LOADING = 'TEAM_HISTORY_ACTIONS:SET_IS_LOADING';
export const SET_SUPER_CURRENT_GAMEWEEK =
  'GAMEWEEK_HISTORY_ACTION:SET_SUPER_CURRENT_GAMEWEEK';

type SetGameweeksHistory = {
  type: typeof SET_GAMEWEEKS_HISTORY;
  payload: LOCAL_GameweekHistoryType[];
};

type SetTeamHistory = {
  type: typeof SET_TEAM_HISTORY;
  payload: any;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

type SetCurrentGameweek = {
  type: typeof SET_SUPER_CURRENT_GAMEWEEK;
  payload: any;
};

export type setGameweekHistoryAction = SetGameweeksHistory | SetLoading;
export type setTeamHistoryAction = SetTeamHistory | SetLoading;
export type AsyncSetGameweekHistoryAction = Thunky<setGameweekHistoryAction>;
export type AsyncSetTeamHistoryAction = Thunky<setTeamHistoryAction>;
export type SetCurrentGameweekAction = SetCurrentGameweek;
