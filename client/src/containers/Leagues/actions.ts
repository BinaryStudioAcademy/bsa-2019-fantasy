import * as leagueService from 'services/leagueService';
import {
  SET_IS_LOADING,
  CREATE_LEAGUE_SUCCESS,
  CREATE_LEAGUE_FAILURE,
  SET_USER_LEAGUES,
  JOIN_LEAGUE_SUCCESS,
  JOIN_LEAGUE_FAILURE,
  SET_LEAGUES_SUGGESTIONS,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  CreateLeagueAction,
  AsyncCreateLeagueAction,
  JoinLeagueAction,
  AsyncJoinLeagueAction,
  SearchLeaguesAction,
  AsyncSearchLeaguesAction,
} from './action.types';

const setIsLoading = (isLoading: boolean): any => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

const createLeagueSuccess = (payload: any): CreateLeagueAction => ({
  type: CREATE_LEAGUE_SUCCESS,
  payload,
});

const createLeagueFailure = (error: any): CreateLeagueAction => ({
  type: CREATE_LEAGUE_FAILURE,
  payload: error,
});

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

const joinLeagueSuccess = (payload: any): JoinLeagueAction => ({
  type: JOIN_LEAGUE_SUCCESS,
  payload,
});

const joinLeagueFailure = (payload: any): JoinLeagueAction => ({
  type: JOIN_LEAGUE_FAILURE,
  payload,
});

const setSuggestions = (payload: any): SearchLeaguesAction => ({
  type: SET_LEAGUES_SUGGESTIONS,
  payload,
});

export const createLeagueAction = (data: {
  name: string;
}): AsyncCreateLeagueAction => async (dispatch) => {
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

export const loadUserLeagues = (): AsyncSetLeaguesAction => async (dispatch) => {
  const result = await leagueService.getUserLeagues();
  dispatch(setUserLeagues(result));
};

export const joinLeague = (data: {
  code: string;
  private: boolean;
}): AsyncJoinLeagueAction => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await leagueService.joinLeague(data);
    dispatch(setIsLoading(false));
    dispatch(joinLeagueSuccess(result));
  } catch (e) {
    dispatch(setIsLoading(false));
    dispatch(joinLeagueFailure(e));
  }
};

export const searchPublicLeagues = (request: {
  filter: string;
}): AsyncSearchLeaguesAction => async (dispatch) => {
  const result = await leagueService.searchPublicLeagues(request);
  dispatch(setSuggestions(result));
};
