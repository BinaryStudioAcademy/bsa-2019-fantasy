import * as playersService from 'services/playersService';
import { Player } from 'types/player.types';
import { Fixture } from 'types/fixture.types';
import {
  FETCH_PLAYERS_SUCCESS,
  FetchPlayersAction,
  AsyncFetchPlayersAction,
  FETCH_PLAYER_FIXTURES_SUCCESS,
  FetchFixturesForPlayerAction,
  AsyncFetchFixturesForPlayerAction,
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

const fetchFixturesForPlayerSuccess = (
  payload: [Fixture],
): FetchFixturesForPlayerAction => ({
  type: FETCH_PLAYER_FIXTURES_SUCCESS,
  payload: payload,
});

export const fetchFixturesForPlayer = (
  playerId: string,
  clubId: string,
): AsyncFetchFixturesForPlayerAction => async (dispatch) => {
  const result = await playersService.getFixturesForPlayer(playerId, clubId);
  dispatch(fetchFixturesForPlayerSuccess(result));
};
