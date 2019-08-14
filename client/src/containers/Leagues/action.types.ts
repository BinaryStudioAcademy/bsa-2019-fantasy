import { Thunky } from 'store/types';

export const CREATE_LEAGUE = 'LEAGUES_ACTION::CREATE_LEAGUE';
export const CREATE_LEAGUE_SUCCESS = 'LEAGUES_ACTION::CREATE_LEAGUE_SUCCESS';
export const CREATE_LEAGUE_FAILURE = 'LEAGUES_ACTION::CREATE_LEAGUE_FAILURE';
export const SET_IS_LOADING = 'LEAGUES_ACTION:SET_IS_LOADING';


type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type CreateLeagueAction = SetLoading | {
  type:
    | typeof CREATE_LEAGUE
    | typeof CREATE_LEAGUE_SUCCESS
    | typeof CREATE_LEAGUE_FAILURE;
  payload: any;
};;
export type AsyncCreateLeagueAction = Thunky<CreateLeagueAction>;
