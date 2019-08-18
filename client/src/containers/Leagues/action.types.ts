import { Thunky } from 'store/types';

export const CREATE_LEAGUE = 'LEAGUES_ACTION::CREATE_LEAGUE';
export const SET_USER_LEAGUES = 'LEAGUES_ACTION:SET_USER_LEAGUES';
export const JOIN_LEAGUE = 'LEAGUES_ACTION: JOIN_LEAGUE';
export const SET_LEAGUES_SUGGESTIONS = 'LEAGUES_ACTION: SET_LEAGUES_SUGGESTIONS';

type SetLeagues = {
  type: typeof SET_USER_LEAGUES;
  payload: any;
};

type SearchLeagues = {
  type: typeof SET_LEAGUES_SUGGESTIONS;
  payload: any;
};

export type JoinLeagueAction = {
  type: typeof JOIN_LEAGUE;
  payload: any;
};

export type CreateLeagueAction = {
  type: typeof CREATE_LEAGUE;
  payload: any;
};

export type AsyncCreateLeagueAction = Thunky<CreateLeagueAction>;
export type SetLeaguesAction = SetLeagues;
export type AsyncSetLeaguesAction = Thunky<SetLeaguesAction>;
export type AsyncJoinLeagueAction = Thunky<JoinLeagueAction>;
export type SearchLeaguesAction = SearchLeagues;
export type AsyncSearchLeaguesAction = Thunky<SearchLeaguesAction>;
