import * as playersService from 'services/playersService';

import { SET_PLAYERS, setPlayersAction, AsyncSetPlayersAction } from './action.type';

import { PlayerType } from 'types/player.types';

const setPlayers = (players: PlayerType[]): setPlayersAction => ({
  type: SET_PLAYERS,
  payload: players,
});

export const loadPlayersAction = (filter: any): AsyncSetPlayersAction => async (
  dispatch,
) => {
  const result = await playersService.getPlayers(filter);
  dispatch(setPlayers(result));
};
