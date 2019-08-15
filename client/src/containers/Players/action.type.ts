import { Thunky } from 'store/types';

export const FETCH_PLAYERS_REQUEST = 'PLAYERS:FETCH_PLAYERS_REQUEST';
export const FETCH_PLAYERS_SUCCESS = 'PLAYERS:FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'PLAYERS:FETCH_PLAYERS_FAILURE';

export type FetchPlayersAction = {
  type:
    | typeof FETCH_PLAYERS_REQUEST
    | typeof FETCH_PLAYERS_SUCCESS
    | typeof FETCH_PLAYERS_FAILURE;
  payload: any;
};
export type AsyncFetchPlayersAction = Thunky<FetchPlayersAction>;
