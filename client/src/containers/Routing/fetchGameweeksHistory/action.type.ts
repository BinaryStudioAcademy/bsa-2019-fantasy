import { Thunky } from 'store/types';

export const FETCH_GAMEWEEK_HISTORY_REQUEST =
  'GAMEWEEKS:FETCH_FETCH_GAMEWEEK_HISTORY_REQUEST';
export const FETCH_GAMEWEEK_HISTORY_SUCCESS =
  'GAMEWEEKS:FETCH_FETCH_GAMEWEEK_HISTORY_SUCCESS';
export const FETCH_GAMEWEEK_HISTORY_FAILURE =
  'GAMEWEEKS:FETCH_FETCH_GAMEWEEK_HISTORY_FAILURE';

export type FetchGameweekHistoryAction = {
  type:
    | typeof FETCH_GAMEWEEK_HISTORY_REQUEST
    | typeof FETCH_GAMEWEEK_HISTORY_SUCCESS
    | typeof FETCH_GAMEWEEK_HISTORY_FAILURE;
  payload: any;
};
export type AsyncFetchGameweekHistoryAction = Thunky<FetchGameweekHistoryAction>;
