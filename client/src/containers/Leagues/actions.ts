import { feedback } from 'react-feedbacker';

import * as leagueService from 'services/leagueService';
import {
  SET_USER_LEAGUES,
  CREATE_LEAGUE_FAILURE,
  CREATE_LEAGUE_SUCCESS,
  SET_INVITATION_CODE,
  SET_LOADING,
  SET_LEAGUES_SUGGESTIONS,
  RESET_LEAGUES_DATA,
  SET_LEAGUE_DETAILS,
  AsyncSetLeagueDetailsAction,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  AsyncCreateLeagueAction,
  AsyncJoinLeagueAction,
  SearchLeaguesAction,
  AsyncSearchLeaguesAction,
  CreateLeagueFailure,
  CreateLeagueSuccess,
  SetInvitationCode,
  AsyncGetInvitationCode,
  SetLoading,
  SetLeagueDetailsAction,
} from './action.types';

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

const setSuggestions = (payload: any): SearchLeaguesAction => ({
  type: SET_LEAGUES_SUGGESTIONS,
  payload,
});

const setLeagueDetails = (payload: any): SetLeagueDetailsAction => ({
  type: SET_LEAGUE_DETAILS,
  payload,
});

const createLeagueFailure = (payload: any): CreateLeagueFailure => ({
  type: CREATE_LEAGUE_FAILURE,
  payload,
});

const createLeagueSuccess = (payload: any): CreateLeagueSuccess => ({
  type: CREATE_LEAGUE_SUCCESS,
  payload,
});

const setLoading = (isLoading: boolean): SetLoading => ({
  type: SET_LOADING,
  payload: isLoading,
});

const setInvitationCode = (payload: string): SetInvitationCode => ({
  type: SET_INVITATION_CODE,
  payload,
});

export const resetLeaguesData = () => ({
  type: RESET_LEAGUES_DATA,
});

export const getInvitationCode = (data: {
  name: string;
}): AsyncGetInvitationCode => async (dispatch) => {
  const { name } = data;

  try {
    const result = await leagueService.getInvitationCode({ name });
    if (!result.forbidden) {
      dispatch(setInvitationCode(result.code));
    }
  } catch (err) {
    console.log('wrong');
  }
};

export const createLeagueAction = (data: {
  name: string;
  private: boolean;
  start_from: number;
}): AsyncCreateLeagueAction => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await leagueService.createLeague(data);
    if (data.private) {
      const { name } = data;
      const result = await leagueService.getInvitationCode({ name });
      dispatch(setInvitationCode(result.code));
    }
    feedback.success((result && result.message) || result);
    dispatch(createLeagueSuccess(result.message));
  } catch (err) {
    feedback.error(err.message);
    dispatch(createLeagueFailure(err.message));
  }
};

export const loadUserLeagues = (): AsyncSetLeaguesAction => async (dispatch) => {
  const result = await leagueService.getUserLeagues();
  dispatch(setUserLeagues(result));
};

export const loadLeagueDetails = (name): AsyncSetLeagueDetailsAction => async (
  dispatch,
) => {
  try {
    const result = await leagueService.getLeagueDetails(name);
    dispatch(setLeagueDetails(result));
  } catch (err) {
    // TODO handle not existing league
  }
};

export const joinLeague = (data: {
  code: string;
  private: boolean;
}): AsyncJoinLeagueAction => async () => {
  try {
    const result = await leagueService.joinLeague(data);
    feedback.success((result && result.message) || result);
  } catch (err) {
    feedback.error('Invalid League code (or name) provided');
  }
};

export const searchPublicLeagues = (request: {
  filter: string;
}): AsyncSearchLeaguesAction => async (dispatch) => {
  const result = await leagueService.searchPublicLeagues(request);
  dispatch(setSuggestions(result));
};
