import * as gameService from 'services/gameService';
import {
  LOAD_CURRENT_GAME_REQUEST,
  LOAD_CURRENT_GAME_SUCCESS,
  LOAD_CURRENT_GAME_FAILURE,
  LoadCurrentGameAction,
  AsyncLoadCurrentGameAction,
} from './action.type';
import { Game } from 'types/game.types';

const loadCurrentGameSuccess = (payload: any): LoadCurrentGameAction => ({
  type: LOAD_CURRENT_GAME_SUCCESS,
  payload,
});

export const loadCurrentGame = (): AsyncLoadCurrentGameAction => async (dispatch) => {
  const result = await gameService.getCurrent();

  dispatch(loadCurrentGameSuccess(result));
};
