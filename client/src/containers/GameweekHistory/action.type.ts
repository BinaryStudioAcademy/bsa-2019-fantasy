import { Thunky } from 'store/types';

export const SET_GAMEWEEKS_HISTORY = 'GAMEWEEK_HISTORY_ACTION:SET_GAMEWEEKS_HISTORY';
export const SET_TEAM_HISTORY = 'TEAM_HISTORY_ACTIONS:SET_TEAM_HISTORY';
export const SET_IS_LOADING = 'TEAM_HISTORY_ACTIONS:SET_IS_LOADING';

type SetGameweeksHistory = {
  type: typeof SET_GAMEWEEKS_HISTORY;
  payload: any;
};

type SetTeamHistory = {
  type: typeof SET_TEAM_HISTORY;
  payload: any;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type setGameweekHistoryAction = SetGameweeksHistory;
export type setTeamHistoryAction = SetTeamHistory | SetLoading;
export type AsyncSetGameweekHistoryAction = Thunky<setGameweekHistoryAction>;
export type AsyncSetTeamHistoryAction = Thunky<setTeamHistoryAction>;
