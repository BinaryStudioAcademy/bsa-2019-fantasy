import * as playersService from 'services/playersService';

import {
  SET_PLAYERS,
  PlayersSelectionAction,
  AsyncSetPlayersAction,
  SET_LOADING,
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

export const loadPlayersAction = (filter: any): AsyncSetPlayersAction => async (
  dispatch,
) => {
  dispatch(setLoading(true));

  const result = await playersService.getPlayers(filter);
  dispatch(setPlayers(result));

  dispatch(setLoading(false));
};
