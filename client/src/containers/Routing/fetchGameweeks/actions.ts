import * as gameweeksService from 'services/gameweekService';
import * as gameweeksHistoryService from 'services/gameweekHistoryService';
import { Club } from 'types/club.type';
import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_FAILURE,
  FetchGameweeksAction,
  AsyncFetchGameweeksAction,
} from './action.type';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

const fetchGameweeksSuccess = (payload: [Club]): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_SUCCESS,
  payload: payload,
});

const fetchGameweeksFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_FAILURE,
  payload: error,
});

const fetchGameweeksHistorySuccess = (payload: [Club]): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  payload: payload,
});

const fetchGameweeksHistoryFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_FAILURE,
  payload: error,
});
export const fetchGameweeks = (): AsyncFetchGameweeksAction => async (dispatch) => {
  const result = await gameweeksService.getGameweeks();
  dispatch(fetchGameweeksSuccess(result));
};

export const fetchGameweekHistory = (
  userId: string,
  gameweekId: string,
): AsyncFetchGameweeksAction => async (dispatch) => {
  const result = await gameweeksHistoryService.getGameweekHistoryForUserById(
    userId,
    gameweekId,
  );
  dispatch(fetchGameweeksHistorySuccess(result));
};

export const postGameweekHistory = (
  userId: string,
  gameweekId: string,
  data: GameweekHistoryType,
): AsyncFetchGameweeksAction => async () => {
  await gameweeksHistoryService.postGameweekHistoryForUserById(userId, gameweekId, data);
};
