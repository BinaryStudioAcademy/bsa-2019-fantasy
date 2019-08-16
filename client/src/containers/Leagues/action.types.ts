import { Thunky } from 'store/types';

export const CREATE_LEAGUE = 'LEAGUES_ACTION::CREATE_LEAGUE';
export const CREATE_LEAGUE_SUCCESS = 'LEAGUES_ACTION::CREATE_LEAGUE_SUCCESS';
export const CREATE_LEAGUE_FAILURE = 'LEAGUES_ACTION::CREATE_LEAGUE_FAILURE';
export const SET_IS_LOADING = 'LEAGUES_ACTION:SET_IS_LOADING';
export const SET_USER_LEAGUES = 'LEAGUES_ACTION:SET_USER_LEAGUES';
export const JOIN_PRIVATE_LEAGUE = 'LEAGUES_ACTION: JOIN_PRIVATE_LEAGUE';
export const JOIN_PRIVATE_LEAGUE_SUCCESS = 'LEAGUES_ACTION: JOIN_PRIVATE_LEAGUE_SUCCESS';
export const JOIN_PRIVATE_LEAGUE_FAILURE = 'LEAGUES_ACTION: JOIN_PRIVATE_LEAGUE_FAILURE';
export const SET_LEAGUES_SUGGESTIONS = 'LEAGUES_ACTION: SET_LEAGUES_SUGGESTIONS';

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

type SetLeagues = {
  type: typeof SET_USER_LEAGUES;
  payload: any;
};

type SearchLeagues = {
  type: typeof SET_LEAGUES_SUGGESTIONS;
  payload: any;
};

export type JoinPrivateLeagueAction =
  | SetLoading
  | {
      type:
        | typeof JOIN_PRIVATE_LEAGUE
        | typeof JOIN_PRIVATE_LEAGUE_SUCCESS
        | typeof JOIN_PRIVATE_LEAGUE_FAILURE;
      payload: any;
    };

export type CreateLeagueAction =
  | SetLoading
  | {
      type:
        | typeof CREATE_LEAGUE
        | typeof CREATE_LEAGUE_SUCCESS
        | typeof CREATE_LEAGUE_FAILURE;
      payload: any;
    };
export type AsyncCreateLeagueAction = Thunky<CreateLeagueAction>;
export type SetLeaguesAction = SetLeagues;
export type AsyncSetLeaguesAction = Thunky<SetLeaguesAction>;
export type AsyncJoinPrivateLeagueAction = Thunky<JoinPrivateLeagueAction>;
export type SearchLeaguesAction = SearchLeagues;
export type AsyncSearchLeaguesAction = Thunky<SearchLeaguesAction>;
