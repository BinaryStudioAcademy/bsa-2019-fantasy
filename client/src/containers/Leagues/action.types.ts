import { Thunky } from 'store/types';

export const SET_LOADING = 'LEAGUES_ACTION:SET_LOADING';
export const CREATE_LEAGUE = 'LEAGUES_ACTION:CREATE_LEAGUE';
export const CREATE_LEAGUE_FAILURE = 'LEAGUES_ACTION:CREATE_LEAGUE_FAILURE';
export const CREATE_LEAGUE_SUCCESS = 'LEAGUES_ACTION:CREATE_LEAGUE_SUCCESS';
export const SET_USER_LEAGUES = 'LEAGUES_ACTION:SET_USER_LEAGUES';
export const JOIN_LEAGUE = 'LEAGUES_ACTION:JOIN_LEAGUE';
export const JOIN_LEAGUE_SUCCESS = 'LEAGUES_ACTION:JOIN_LEAGUE_SUCCESS';
export const SET_LEAGUES_SUGGESTIONS = 'LEAGUES_ACTION:SET_LEAGUES_SUGGESTIONS';
export const RESET_LEAGUES_DATA = 'LEAGUES_ACTION:RESET_LEAGUES_DATA';
export const SET_INVITATION_CODE = 'LEAGUES_ACTION:SET_INVITATION_CODE';
export const SET_LEAGUE_DETAILS = 'LEAGUES_ACTION:SET_LEAGUE_DETAILS';

export type SetLoading = {
  type: typeof SET_LOADING;
  payload: boolean;
};

type SetLeagues = {
  type: typeof SET_USER_LEAGUES;
  payload: any;
};

type SetLeagueDetails = {
  type: typeof SET_LEAGUE_DETAILS;
  payload: any;
};

type SearchLeagues = {
  type: typeof SET_LEAGUES_SUGGESTIONS;
  payload: any;
};

export type CreateLeagueFailure = {
  type: typeof CREATE_LEAGUE_FAILURE;
  payload: any;
};

export type CreateLeagueSuccess = {
  type: typeof CREATE_LEAGUE_SUCCESS;
  payload: any;
};

export type JoinLeagueSuccess = {
  type: typeof JOIN_LEAGUE_SUCCESS;
  payload: any;
};

export type JoinLeagueAction = {
  type: typeof JOIN_LEAGUE | typeof JOIN_LEAGUE_SUCCESS;
  payload: any;
};

export type SetInvitationCode = {
  type: typeof SET_INVITATION_CODE;
  payload: any;
};

export type CreateLeagueAction = {
  type:
    | typeof CREATE_LEAGUE
    | typeof SET_INVITATION_CODE
    | typeof SET_LOADING
    | typeof CREATE_LEAGUE_FAILURE
    | typeof CREATE_LEAGUE_SUCCESS;
  payload: any;
};

export type GetInvitationCode = {
  type: typeof SET_INVITATION_CODE;
  payload: any;
};

export type ResetLeagueAction = {
  type: typeof RESET_LEAGUES_DATA;
};

export type AsyncCreateLeagueAction = Thunky<CreateLeagueAction>;
export type SetLeaguesAction = SetLeagues;
export type AsyncSetLeaguesAction = Thunky<SetLeaguesAction>;
export type AsyncJoinLeagueAction = Thunky<JoinLeagueAction>;
export type SearchLeaguesAction = SearchLeagues;
export type SetLeagueDetailsAction = SetLeagueDetails;
export type AsyncSearchLeaguesAction = Thunky<SearchLeaguesAction>;
export type AsyncGetInvitationCode = Thunky<GetInvitationCode>;
export type AsyncSetLeagueDetailsAction = Thunky<SetLeagueDetailsAction>;
