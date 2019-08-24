import * as playersService from 'services/playersService';
import { PlayerType } from 'types/player.types';
import { Fixture } from 'types/fixture.types';
import { History } from 'types/history.types';
import {
  FETCH_PLAYERS_SUCCESS,
  FetchPlayersAction,
  AsyncFetchPlayersAction,
  FETCH_PLAYER_DIALOG_CONTENT_SUCCESS,
  FetchDataForPlayerAction,
  AsyncFetchaDataForPlayerAction,
  RESET_PLAYER_DIALOG_CONTENT,
  SET_IS_LOADING_PLAYER_DIALOG,
  SetIsLoadingPlayerDialogAction,
} from './action.type';

export type PlayerDataType = {
  fixtures: Fixture[];
  history: History[];
};

const fetchPlayersSuccess = (payload: {
  count: number;
  rows: PlayerType[];
}): FetchPlayersAction => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: payload,
});

export const fetchPlayers = (filter: any): AsyncFetchPlayersAction => async (
  dispatch,
) => {
  const result = await playersService.getPlayers(filter);
  dispatch(fetchPlayersSuccess(result));
};

const fetchDataForPlayerSuccess = (
  payload: PlayerDataType,
): FetchDataForPlayerAction => ({
  type: FETCH_PLAYER_DIALOG_CONTENT_SUCCESS,
  payload: payload,
});

const setIsLoadingDialog = (isLoading: boolean): SetIsLoadingPlayerDialogAction => ({
  type: SET_IS_LOADING_PLAYER_DIALOG,
  payload: isLoading,
});

export const fetchDataForPlayer = (
  playerId: string,
  clubId: string,
): AsyncFetchaDataForPlayerAction => async (dispatch) => {
  dispatch(setIsLoadingDialog(true));
  const fixtures = await playersService.getFixturesForPlayer(playerId, clubId);
  const history = await playersService.getStatsForPlayer(playerId);
  dispatch(fetchDataForPlayerSuccess({ fixtures, history }));
};

const resetPlayerDialogDataSuccess = () => ({
  type: RESET_PLAYER_DIALOG_CONTENT,
});

export const resetPlayerDialogData = () => (dispatch: any) => {
  dispatch(resetPlayerDialogDataSuccess());
};
