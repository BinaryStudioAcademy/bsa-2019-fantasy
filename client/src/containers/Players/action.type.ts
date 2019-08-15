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
export const RESET_PLAYER_DIALOG_CONTENT = 'PLAYERS:RESET_PLAYER_DIALOG_CONTENT';
export const SET_IS_LOADING_PLAYER_DIALOG = 'PLAYERS:SET_IS_LOADING_PLAYER_DIALOG';

export type FetchDataForPlayerAction = {
  type:
    | typeof FETCH_PLAYER_DIALOG_CONTENT_REQUEST
    | typeof FETCH_PLAYER_DIALOG_CONTENT_SUCCESS
    | typeof SET_IS_LOADING_PLAYER_DIALOG;
  payload: any;
};

export type ResestPlayerDialogDataAction = {
  type: typeof RESET_PLAYER_DIALOG_CONTENT;
  payload: any;
};

export type SetIsLoadingPlayerDialogAction = {
  type: typeof SET_IS_LOADING_PLAYER_DIALOG;
  payload: boolean;
};
export type AsyncFetchaDataForPlayerAction = Thunky<FetchDataForPlayerAction>;
