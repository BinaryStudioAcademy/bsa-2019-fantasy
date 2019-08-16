import * as leagueService from 'services/leagueService';
import {
  SET_IS_LOADING,
  CREATE_LEAGUE_SUCCESS,
  CREATE_LEAGUE_FAILURE,
  SET_USER_LEAGUES,
  JOIN_PRIVATE_LEAGUE_SUCCESS,
  JOIN_PRIVATE_LEAGUE_FAILURE,
  SET_LEAGUES_SUGGESTIONS,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  CreateLeagueAction,
  AsyncCreateLeagueAction,
  JoinPrivateLeagueAction,
  AsyncJoinPrivateLeagueAction,
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

const joinPrivateLeagueSuccess = (payload: any): JoinPrivateLeagueAction => ({
  type: JOIN_PRIVATE_LEAGUE_SUCCESS,
  payload,
});

const joinPrivateLeagueFailure = (payload: any): JoinPrivateLeagueAction => ({
  type: JOIN_PRIVATE_LEAGUE_FAILURE,
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

export const joinPrivateLeague = (data: {
  code: string;
}): AsyncJoinPrivateLeagueAction => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await leagueService.joinPrivateLeague(data);
    dispatch(setIsLoading(false));
    dispatch(joinPrivateLeagueSuccess(result));
  } catch (e) {
    dispatch(setIsLoading(false));
    dispatch(joinPrivateLeagueFailure(e));
  }
};

export const searchPublicLeagues = (request: {
  filter: string;
}): AsyncSearchLeaguesAction => async (dispatch) => {
  const result = await leagueService.searchPublicLeagues(request);
  dispatch(setSuggestions(result));
};
