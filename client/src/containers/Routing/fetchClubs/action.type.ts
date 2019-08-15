import { Thunky } from 'store/types';
import { Club } from 'types/club.types';

export const FETCH_CLUBS_REQUEST = 'CLUBS:FETCH_FETCH_CLUBS_REQUEST';
export const FETCH_CLUBS_SUCCESS = 'CLUBS:FETCH_FETCH_CLUBS_SUCCESS';
export const FETCH_CLUBS_FAILURE = 'CLUBS:FETCH_FETCH_CLUBS_FAILURE';

type FetchClubsRequest = {
  type: typeof FETCH_CLUBS_REQUEST;
};

type FetchClubsSuccess = {
  type: typeof FETCH_CLUBS_SUCCESS;
  payload: Club[];
};

type FetchClubFailure = {
  type: typeof FETCH_CLUBS_FAILURE;
  payload: string;
};

export type FetchClubsAction = FetchClubsRequest | FetchClubsSuccess | FetchClubFailure;
export type AsyncFetchClubsAction = Thunky<FetchClubsAction>;
