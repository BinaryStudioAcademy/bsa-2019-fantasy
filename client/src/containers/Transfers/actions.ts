import * as playersService from 'services/playersService';

import { SET_PLAYERS, setPlayersAction, AsyncSetPlayersAction } from './action.type';

import { Player } from 'types/player.types';

const setPlayers = (players: Player[]): setPlayersAction => ({
  type: SET_PLAYERS,
  payload: players,
});

export const loadPlayersAction = (): AsyncSetPlayersAction => async (dispatch) => {
  const result = await playersService.getPlayers();
  dispatch(setPlayers(result));
};
