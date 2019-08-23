import { Thunky } from 'store/types';
import { GameweekType } from 'types/gameweek.type';
import {
  GameweekHistoryType,
  GameweekHistoryResultsType,
  GameweekUserRankingType,
} from 'types/gameweekHistory.type';

export const FETCH_GAMEWEEKS_REQUEST = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_REQUEST';
export const FETCH_GAMEWEEKS_SUCCESS = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_SUCCESS';
export const FETCH_GAMEWEEKS_FAILURE = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_FAILURE';
export const FETCH_GAMEWEEKS_HISTORY_REQUEST = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_REQUEST';
export const FETCH_GAMEWEEKS_HISTORY_SUCCESS =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_SUCCESS';
export const FETCH_GAMEWEEKS_HISTORY_FAILURE =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_FAILURE';
export const FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST';
export const FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS';
export const FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE =
  'GAMEWEEKS:FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE';
export const FETCH_GAMEWEEK_USER_RANKING_REQUEST =
  'GAMEWEEKS:FETCH_GAMEWEEK_USER_RANKING_REQUEST';
export const FETCH_GAMEWEEK_USER_RANKING_SUCCESS =
  'GAMEWEEKS:FETCH_GAMEWEEK_USER_RANKING_SUCCESS';
export const FETCH_GAMEWEEK_USER_RANKING_FAILURE =
  'GAMEWEEKS:FETCH_GAMEWEEK_USER_RANKING_FAILURE';

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
type FetchGameweeksHistoryResultsRequest = {
  type: typeof FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST;
};

type FetchGameweeksHistoryResultsSuccess = {
  type: typeof FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS;
  payload: GameweekHistoryResultsType[];
};

type FetchGameweeksHistoryResultsFailure = {
  type: typeof FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE;
  payload: string;
};
type FetchGameweekUserRankingRequest = {
  type: typeof FETCH_GAMEWEEK_USER_RANKING_REQUEST;
};

type FetchGameweekUserRankingSuccess = {
  type: typeof FETCH_GAMEWEEK_USER_RANKING_SUCCESS;
  payload: GameweekUserRankingType;
};

type FetchGameweekUserRankingFailure = {
  type: typeof FETCH_GAMEWEEK_USER_RANKING_FAILURE;
  payload: string;
};
export type FetchGameweeksAction =
  | FetchGameweeksRequest
  | FetchGameweeksSuccess
  | FetchGameweeksFailure
  | FetchGameweeksHistoryRequest
  | FetchGameweeksHistorySuccess
  | FetchGameweeksHistoryFailure
  | FetchGameweeksHistoryResultsRequest
  | FetchGameweeksHistoryResultsSuccess
  | FetchGameweeksHistoryResultsFailure
  | FetchGameweekUserRankingRequest
  | FetchGameweekUserRankingSuccess
  | FetchGameweekUserRankingFailure;
export type AsyncFetchGameweeksAction = Thunky<FetchGameweeksAction>;
