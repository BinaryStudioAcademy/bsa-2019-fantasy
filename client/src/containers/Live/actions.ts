import * as gameService from 'services/gameService';
import {
  LOAD_CURRENT_GAME_REQUEST,
  LOAD_CURRENT_GAME_SUCCESS,
  LOAD_CURRENT_GAME_FAILURE,
  SET_LIVE_STATUS,
  ADD_LIVE_EVENT,
  LoadCurrentGameAction,
  AsyncLoadCurrentGameAction,
  SetLiveStatusAction,
  AddLiveEventAction,
} from './action.type';
import { Game } from 'types/game.types';

const loadCurrentGameRequest = (): LoadCurrentGameAction => ({
  type: LOAD_CURRENT_GAME_REQUEST,
});

const loadCurrentGameSuccess = (payload: any): LoadCurrentGameAction => ({
  type: LOAD_CURRENT_GAME_SUCCESS,
  payload,
});

export const loadCurrentGame = (): AsyncLoadCurrentGameAction => async (dispatch) => {
  dispatch(loadCurrentGameRequest());
  const result = await gameService.getCurrent();
  dispatch(loadCurrentGameSuccess(result));
};

export const setLiveStatus = (payload: any): SetLiveStatusAction => ({
  type: SET_LIVE_STATUS,
  payload,
});

export const addLiveEvent = (payload: any): AddLiveEventAction => ({
  type: ADD_LIVE_EVENT,
  payload,
});
