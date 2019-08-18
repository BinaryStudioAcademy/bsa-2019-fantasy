import { feedback } from 'react-feedbacker';

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

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

const setSuggestions = (payload: any): SearchLeaguesAction => ({
  type: SET_LEAGUES_SUGGESTIONS,
  payload,
});

export const createLeagueAction = (data: {
  name: string;
  private: boolean;
  start_from: number;
}): AsyncCreateLeagueAction => async (dispatch) => {
  try {
    const result = await leagueService.createLeague(data);
    feedback.success((result && result.message) || result);
  } catch (err) {
    feedback.error(err.message);
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
    const result = await leagueService.joinLeague(data);
    feedback.success((result && result.message) || result);
  } catch (err) {
    feedback.error(err.message);
  }
};

export const searchPublicLeagues = (request: {
  filter: string;
}): AsyncSearchLeaguesAction => async (dispatch) => {
  const result = await leagueService.searchPublicLeagues(request);
  dispatch(setSuggestions(result));
};
