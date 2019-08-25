import { Thunky } from 'store/types';

export const SET_PLAYERS = 'PLAYERS:SET_PLAYERS';
export const SET_AUTOPICK_SQUAD = 'PLAYERS:SET_AUTOPICK_SQUAD';

type SetPlayers = {
  type: typeof SET_PLAYERS;
  payload: any;
};

type SetAutoPick = {
  type: typeof SET_AUTOPICK_SQUAD;
  payload: any;
};

export type PlayersAction = SetPlayers | SetAutoPick;
export type AsyncPlayersAction = Thunky<PlayersAction>;
