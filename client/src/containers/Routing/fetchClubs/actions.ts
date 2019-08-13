import * as clubsService from 'services/clubsService';
import { Club } from 'types/club.types';
import {
  FETCH_CLUBS_REQUEST,
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_FAILURE,
  FetchClubsAction,
  AsyncFetchClubsAction,
} from './action.type';

const fetchClubsSuccess = (payload: [Club]): FetchClubsAction => ({
  type: FETCH_CLUBS_SUCCESS,
  payload: payload,
});

const fetchClubsFailure = (error: string): FetchClubsAction => ({
  type: FETCH_CLUBS_FAILURE,
  payload: error,
});

export const fetchClubs = (): AsyncFetchClubsAction => async (dispatch) => {
  const result = await clubsService.getClubs();
  dispatch(fetchClubsSuccess(result));
};
