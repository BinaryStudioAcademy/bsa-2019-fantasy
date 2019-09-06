import * as playersService from 'services/playersService';

import {
  SET_PLAYERS,
  RESET_PLAYERS,
  TopTransfersAction,
  AsyncTopTransfersAction,
} from './action.type';

import { PlayerType } from 'types/player.types';

const setPlayers = (payload: {
  rows: PlayerType[];
  count: number;
}): TopTransfersAction => ({
  type: SET_PLAYERS,
  payload,
});

const resetPlayers = () => ({
  type: RESET_PLAYERS,
});

export const loadPlayersAction = (filter: any): AsyncTopTransfersAction => async (dispatch) => {
  const result = await playersService.getPlayers(filter);
  dispatch(setPlayers(result));
};

export const resetPlayersAction = () => (dispatch) => {
  dispatch(resetPlayers());
};