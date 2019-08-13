import * as playersService from 'services/playersService';
import { Player } from 'types/player.types';
import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FetchPlayersAction,
  AsyncFetchPlayersAction,
} from './action.type';

const fetchPlayersSuccess = (payload: [Player]): FetchPlayersAction => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: payload,
});

const fetchPlayersFailure = (error: string): FetchPlayersAction => ({
  type: FETCH_PLAYERS_FAILURE,
  payload: error,
});

export const fetchPlayers = (filter: any): AsyncFetchPlayersAction => async (
  dispatch,
) => {
  const result = await playersService.getPlayers(filter);
  dispatch(fetchPlayersSuccess(result));
};
