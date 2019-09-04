import * as playersService from 'services/playersService';

import {
  SET_PLAYERS,
  RESET_PLAYERS,
  SET_AUTOPICK_SQUAD,
  SET_LOADING,
  PlayersSelectionAction,
  AsyncPlayersSelectionAction,
} from './action.type';

import { PlayerType } from 'types/player.types';

const setLoading = (loading: boolean): PlayersSelectionAction => ({
  type: SET_LOADING,
  payload: loading,
});

const setPlayers = (payload: {
  rows: PlayerType[];
  count: number;
}): PlayersSelectionAction => ({
  type: SET_PLAYERS,
  payload,
});

const resetPlayers = () => ({
  type: RESET_PLAYERS,
});

const setAutoPickSquad = (autoPick: PlayerType[]): PlayersSelectionAction => ({
  type: SET_AUTOPICK_SQUAD,
  payload: autoPick,
});

export const loadPlayersAction = (filter: any): AsyncPlayersSelectionAction => async (dispatch) => {
  dispatch(setLoading(true));

  const result = await playersService.getPlayers(filter);
  dispatch(setPlayers(result));

  dispatch(setLoading(false));
};

export const resetPlayersAction = () => (dispatch) => {
  dispatch(resetPlayers());
};

export const loadAutoPickAction = (): AsyncPlayersSelectionAction => async (dispatch) => {
  const result = await playersService.getRandomSquad();

  dispatch(setAutoPickSquad(result));
};