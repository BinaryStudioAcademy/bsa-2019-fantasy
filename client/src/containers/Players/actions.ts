import * as playersService from 'services/playersService';
import { Player } from 'types/player.types';
import { Fixture } from 'types/fixture.types';
import { History } from 'types/history.types';
import {
  FETCH_PLAYERS_SUCCESS,
  FetchPlayersAction,
  AsyncFetchPlayersAction,
  FETCH_PLAYER_DIALOG_CONTENT_SUCCESS,
  FetchaDataForPlayerAction,
  AsyncFetchaDataForPlayerAction,
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

const fetchDataForPlayerSuccess = (payload: {
  fixtures: [Fixture];
  history: [History];
}): FetchaDataForPlayerAction => ({
  type: FETCH_PLAYER_DIALOG_CONTENT_SUCCESS,
  payload: payload,
});

export const fetchDataForPlayer = (
  playerId: string,
  clubId: string,
): AsyncFetchaDataForPlayerAction => async (dispatch) => {
  const fixtures = await playersService.getFixturesForPlayer(playerId, clubId);
  const history = await playersService.getStatsForPlayer(playerId);
  dispatch(fetchDataForPlayerSuccess({ fixtures, history }));
};
