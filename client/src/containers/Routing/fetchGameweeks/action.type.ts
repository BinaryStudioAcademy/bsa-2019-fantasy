import { Thunky } from 'store/types';

export const FETCH_GAMEWEEKS_REQUEST = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_REQUEST';
export const FETCH_GAMEWEEKS_SUCCESS = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_SUCCESS';
export const FETCH_GAMEWEEKS_FAILURE = 'GAMEWEEKS:FETCH_FETCH_GAMEWEEKS_FAILURE';

export type FetchGameweeksAction = {
  type:
    | typeof FETCH_GAMEWEEKS_REQUEST
    | typeof FETCH_GAMEWEEKS_SUCCESS
    | typeof FETCH_GAMEWEEKS_FAILURE;
  payload: any;
};
export type AsyncFetchGameweeksAction = Thunky<FetchGameweeksAction>;
