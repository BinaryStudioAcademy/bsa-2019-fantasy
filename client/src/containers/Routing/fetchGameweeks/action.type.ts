import { Thunky } from 'store/types';
import { Club } from 'types/club.types';

export const FETCH_GAMEWEEKS_REQUEST = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_REQUEST';
export const FETCH_GAMEWEEKS_SUCCESS = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_SUCCESS';
export const FETCH_GAMEWEEKS_FAILURE = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_FAILURE';

type FetchGameweeksRequest = {
  type: typeof FETCH_GAMEWEEKS_REQUEST;
};

type FetchGameweeksSuccess = {
  type: typeof FETCH_GAMEWEEKS_SUCCESS;
  payload: Club[];
};

type FetchGameweeksFailure = {
  type: typeof FETCH_GAMEWEEKS_FAILURE;
  payload: string;
};

export type FetchGameweeksAction =
  | FetchGameweeksRequest
  | FetchGameweeksSuccess
  | FetchGameweeksFailure;
export type AsyncFetchGameweeksAction = Thunky<FetchGameweeksAction>;
