import { Thunky } from 'store/types';
import { PlayerType } from 'types/player.types';

export const SET_PLAYERS = 'TOP_TRANSFERS:SET_PLAYERS';
export const RESET_PLAYERS = 'TOP_TRANSFERS:RESET_PLAYERS';

type SetPlayers = {
  type: typeof SET_PLAYERS;
  payload: { rows: PlayerType[]; count: number };
};

type ResetPlayers = {
  type: typeof RESET_PLAYERS;
};

export type TopTransfersAction = SetPlayers | ResetPlayers;
export type AsyncTopTransfersAction = Thunky<TopTransfersAction>;