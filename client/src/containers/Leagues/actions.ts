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
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  AsyncCreateLeagueAction,
  AsyncJoinLeagueAction,
  SearchLeaguesAction,
  AsyncSearchLeaguesAction,
} from './action.types';

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

const setSuggestions = (payload: any): SearchLeaguesAction => ({
  type: SET_LEAGUES_SUGGESTIONS,
  payload,
});

const createLeagueFailure = (payload) => ({
  type: CREATE_LEAGUE_FAILURE,
  payload,
});

const createLeagueSuccess = (payload) => ({
  type: CREATE_LEAGUE_SUCCESS,
  payload,
});

const setLoading = (isLoading: boolean): any => ({
  type: SET_LOADING,
  payload: isLoading,
});

const setInvitationCode = (payload: string) => ({
  type: SET_INVITATION_CODE,
  payload,
});

export const resetLeaguesData = () => ({
  type: RESET_LEAGUES_DATA,
});

export const getInvitationCode = (data: { name: string }): any => async (dispatch) => {
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
}): any => async (dispatch) => {
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

export const joinLeague = (data: {
  code: string;
  private: boolean;
}): AsyncJoinLeagueAction => async () => {
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
