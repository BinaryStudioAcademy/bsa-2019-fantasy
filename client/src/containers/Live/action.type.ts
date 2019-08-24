import { Thunky } from 'store/types';
import { Game } from 'types/game.types';

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
