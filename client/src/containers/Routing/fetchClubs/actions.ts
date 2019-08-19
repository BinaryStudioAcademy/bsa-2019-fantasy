import * as clubService from 'services/clubService';
import { Club } from 'types/club.type';
import {
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_FAILURE,
  FetchClubsAction,
  AsyncFetchClubsAction,
} from './action.type';

const fetchClubsSuccess = (payload: Club[]): FetchClubsAction => ({
  type: FETCH_CLUBS_SUCCESS,
  payload: payload,
});

const fetchClubsFailure = (error: string): FetchClubsAction => ({
  type: FETCH_CLUBS_FAILURE,
  payload: error,
});

export const fetchClubs = (): AsyncFetchClubsAction => async (dispatch) => {
  const result = await clubService.getClubs();
  dispatch(fetchClubsSuccess(result));
};
