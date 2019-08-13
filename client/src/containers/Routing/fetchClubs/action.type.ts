import { Thunky } from 'store/types';

export const FETCH_CLUBS_REQUEST = 'CLUBS:FETCH_FETCH_CLUBS_REQUEST';
export const FETCH_CLUBS_SUCCESS = 'CLUBS:FETCH_FETCH_CLUBS_SUCCESS';
export const FETCH_CLUBS_FAILURE = 'CLUBS:FETCH_FETCH_CLUBS_FAILURE';

export type FetchClubsAction = {
  type:
    | typeof FETCH_CLUBS_REQUEST
    | typeof FETCH_CLUBS_SUCCESS
    | typeof FETCH_CLUBS_FAILURE;
  payload: any;
};
export type AsyncFetchClubsAction = Thunky<FetchClubsAction>;
