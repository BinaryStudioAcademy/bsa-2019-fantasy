import { Thunky } from 'store/types';
import { Game } from 'types/game.types';

export const SET_LIVE_STATUS = 'CURRENT_GAME:SET_LIVE_STATUS';
export const ADD_LIVE_EVENT = 'CURRENT_GAME:ADD_LIVE_EVENT';

export type LiveStatusObject = {
  gameStarted: boolean;
  homeClubId?: string;
  awayClubId?: string;
  score?: number[];
  elapsed?: number;
  events: any[];
};

export type SetLiveStatusAction = {
  type: typeof SET_LIVE_STATUS;
  payload: LiveStatusObject;
};

export type AddLiveEventAction = {
  type: typeof ADD_LIVE_EVENT;
  payload: any;
};

export const LOAD_CURRENT_GAME_REQUEST = 'CURRENT_GAME:LOAD_CURRENT_GAME_REQUEST';
export const LOAD_CURRENT_GAME_SUCCESS = 'CURRENT_GAME:LOAD_CURRENT_GAME_SUCCESS';
export const LOAD_CURRENT_GAME_FAILURE = 'CURRENT_GAME:LOAD_CURRENT_GAME_FAILURE';

type LoadCurrentGameRequest = {
  type: typeof LOAD_CURRENT_GAME_REQUEST;
};

type LoadCurrentGameSuccess = {
  type: typeof LOAD_CURRENT_GAME_SUCCESS;
  payload: { current: Game; next: Game };
};

type LoadCurrentGameFailure = {
  type: typeof LOAD_CURRENT_GAME_FAILURE;
  payload: string;
};

export type LoadCurrentGameAction =
  | LoadCurrentGameRequest
  | LoadCurrentGameSuccess
  | LoadCurrentGameFailure;
export type AsyncLoadCurrentGameAction = Thunky<LoadCurrentGameAction>;

export const LOAD_LAST_GAMES_REQUEST = 'LAST_GAMES:LOAD_LAST_GAMES_REQUEST';
export const LOAD_LAST_GAMES_SUCCESS = 'LAST_GAMES:LOAD_LAST_GAMES_SUCCESS';
export const LOAD_LAST_GAMES_FAILURE = 'LAST_GAMES:LOAD_LAST_GAMES_FAILURE';

type LoadLastGamesRequest = {
  type: typeof LOAD_LAST_GAMES_REQUEST;
};

type LoadLastGamesSuccess = {
  type: typeof LOAD_LAST_GAMES_SUCCESS;
  payload: Game[];
};

type LoadLastGamesFailure = {
  type: typeof LOAD_LAST_GAMES_FAILURE;
  payload: string;
};

export type LoadLastGamesAction =
  | LoadLastGamesRequest
  | LoadLastGamesSuccess
  | LoadLastGamesFailure;
export type AsyncLoadLastGamesAction = Thunky<LoadLastGamesAction>;
