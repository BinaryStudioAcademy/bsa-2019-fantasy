import { Thunky } from 'store/types';

export const SET_PLAYERS = 'PLAYERS:SET_PLAYERS';

type SetPlayers = {
  type: typeof SET_PLAYERS;
  payload: any
}

export type setPlayersAction = SetPlayers;
export type AsyncSetPlayersAction = Thunky<setPlayersAction>;
