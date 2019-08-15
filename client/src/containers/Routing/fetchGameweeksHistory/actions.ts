import * as gameweekHistoryService from 'services/gameweekHistoryService';
import { Club } from 'types/club.type';
import {
  FETCH_GAMEWEEK_HISTORY_REQUEST,
  FETCH_GAMEWEEK_HISTORY_SUCCESS,
  FETCH_GAMEWEEK_HISTORY_FAILURE,
  FetchGameweekHistoryAction,
  AsyncFetchGameweekHistoryAction,
} from './action.type';

const fetchGameweekHistorySuccess = (payload: [Club]): FetchGameweekHistoryAction => ({
  type: FETCH_GAMEWEEK_HISTORY_SUCCESS,
  payload: payload,
});

const fetchGameweekHistoryFailure = (error: string): FetchGameweekHistoryAction => ({
  type: FETCH_GAMEWEEK_HISTORY_FAILURE,
  payload: error,
});

export const fetchGameweekHistory = (
  userId: string,
  gameweekId: string,
): AsyncFetchGameweekHistoryAction => async (dispatch) => {
  const result = await gameweekHistoryService.getGameweekHistoryForUserById(
    userId,
    gameweekId,
  );
  console.log(result);
  dispatch(fetchGameweekHistorySuccess(result));
};
