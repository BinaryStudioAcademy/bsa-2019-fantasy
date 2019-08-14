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

export const FETCH_PLAYER_DIALOG_CONTENT_REQUEST =
  'PLAYERS:FETCH_PLAYER_DIALOG_CONTENT_REQUEST';
export const FETCH_PLAYER_DIALOG_CONTENT_SUCCESS =
  'PLAYERS:FETCH_PLAYER_DIALOG_CONTENT_SUCCESS';

export type FetchaDataForPlayerAction = {
  type:
    | typeof FETCH_PLAYER_DIALOG_CONTENT_REQUEST
    | typeof FETCH_PLAYER_DIALOG_CONTENT_SUCCESS;
  payload: any;
};
export type AsyncFetchaDataForPlayerAction = Thunky<FetchaDataForPlayerAction>;
