import * as playersService from 'services/playersService';
import { Player } from 'types/player.types';
import {
  FETCH_PLAYERS_SUCCESS,
  FetchPlayersAction,
  AsyncFetchPlayersAction,
} from './action.type';

const fetchPlayersSuccess = (payload: [Player]): FetchPlayersAction => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: payload,
});

export const fetchPlayers = (filter: any): AsyncFetchPlayersAction => async (
  dispatch,
) => {
  const result = await playersService.getPlayers(filter);
  dispatch(fetchPlayersSuccess(result));
};
