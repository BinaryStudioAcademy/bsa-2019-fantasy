import { Thunky } from 'store/types';
import { GameweekType } from 'types/gameweek.type';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

export const FETCH_GAMEWEEKS_REQUEST = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_REQUEST';
export const FETCH_GAMEWEEKS_SUCCESS = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_SUCCESS';
export const FETCH_GAMEWEEKS_FAILURE = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_FAILURE';
export const FETCH_GAMEWEEKS_HISTORY_REQUEST = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_REQUEST';
export const FETCH_GAMEWEEKS_HISTORY_SUCCESS =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_SUCCESS';
export const FETCH_GAMEWEEKS_HISTORY_FAILURE =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_FAILURE';

type FetchGameweeksRequest = {
  type: typeof FETCH_GAMEWEEKS_REQUEST;
};

type FetchGameweeksSuccess = {
  type: typeof FETCH_GAMEWEEKS_SUCCESS;
  payload: GameweekType[];
};

type FetchGameweeksFailure = {
  type: typeof FETCH_GAMEWEEKS_FAILURE;
  payload: string;
};

type FetchGameweeksHistoryRequest = {
  type: typeof FETCH_GAMEWEEKS_HISTORY_REQUEST;
};

type FetchGameweeksHistorySuccess = {
  type: typeof FETCH_GAMEWEEKS_HISTORY_SUCCESS;
  payload: GameweekHistoryType[];
};

type FetchGameweeksHistoryFailure = {
  type: typeof FETCH_GAMEWEEKS_HISTORY_FAILURE;
  payload: string;
};

export type FetchGameweeksAction =
  | FetchGameweeksRequest
  | FetchGameweeksSuccess
  | FetchGameweeksFailure
  | FetchGameweeksHistoryRequest
  | FetchGameweeksHistorySuccess
  | FetchGameweeksHistoryFailure;
export type AsyncFetchGameweeksAction = Thunky<FetchGameweeksAction>;
