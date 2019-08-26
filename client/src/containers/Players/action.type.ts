import { Thunky } from 'store/types';
import { PlayerType } from 'types/player.types';

export const FETCH_PLAYERS_REQUEST = 'PLAYERS:FETCH_PLAYERS_REQUEST';
export const FETCH_PLAYERS_SUCCESS = 'PLAYERS:FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'PLAYERS:FETCH_PLAYERS_FAILURE';

type FetchPlayersRequest = {
  type: typeof FETCH_PLAYERS_REQUEST;
};

type FetchPlayersSuccess = {
  type: typeof FETCH_PLAYERS_SUCCESS;
  payload: { count: number; rows: PlayerType[] };
};

type FetchPlayersFailure = {
  type: typeof FETCH_PLAYERS_FAILURE;
  payload: string;
};

export type FetchPlayersAction =
  | FetchPlayersRequest
  | FetchPlayersSuccess
  | FetchPlayersFailure;
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
