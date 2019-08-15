import * as leagueService from 'services/leagueService';
import {
  SET_IS_LOADING,
  CREATE_LEAGUE_SUCCESS,
  CREATE_LEAGUE_FAILURE,
  AsyncCreateLeagueAction,
  CreateLeagueAction,
} from './action.types';

const setIsLoading = (isLoading: boolean): CreateLeagueAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

const createLeagueSuccess = (payload: any): CreateLeagueAction => ({
  type: CREATE_LEAGUE_SUCCESS,
  payload
});

const createLeagueFailure = (error: any): CreateLeagueAction => ({
  type: CREATE_LEAGUE_FAILURE,
  payload: error
});

export const createLeagueAction = (data: { name: string }): AsyncCreateLeagueAction => async (
  dispatch,
) => {
  try {
    dispatch(setIsLoading(true));
    const result = await leagueService.createLeague(data);
    dispatch(setIsLoading(false));
    dispatch(createLeagueSuccess(result));
  } catch (e) {
    dispatch(setIsLoading(false));
    dispatch(createLeagueFailure(e));
  }
};
