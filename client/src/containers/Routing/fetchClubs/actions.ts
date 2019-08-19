import * as clubsService from 'services/clubService';
import { Club } from 'types/club.type';
import {
  FETCH_CLUBS_REQUEST,
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_FAILURE,
  FetchClubsAction,
  AsyncFetchClubsAction,
} from './action.type';

const fetchClubsRequest = (): FetchClubsAction => ({
  type: FETCH_CLUBS_REQUEST,
});

const fetchClubsSuccess = (clubs: Club[]): FetchClubsAction => ({
  type: FETCH_CLUBS_SUCCESS,
  payload: clubs,
});

export const fetchClubsFailure = (error: string): FetchClubsAction => ({
  type: FETCH_CLUBS_FAILURE,
  payload: error,
});

export const fetchClubs = (): AsyncFetchClubsAction => async (dispatch) => {
  dispatch(fetchClubsRequest());

  try {
    const result = await clubsService.getClubs();
    dispatch(fetchClubsSuccess(result));
  } catch (err) {
    dispatch(fetchClubsFailure(err.message || err));
  }
};
