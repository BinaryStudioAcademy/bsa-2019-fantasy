import { Thunky } from 'store/types';
import { PlayerType } from 'types/player.types';

export const SET_LOADING = 'PLAYERS_SELECTION:SET_LOADING';
export const SET_PLAYERS = 'PLAYERS_SELECTION:SET_PLAYERS';

type SetPlayers = {
  type: typeof SET_PLAYERS;
  payload: { rows: PlayerType[]; count: number };
};

type SetLoading = {
  type: typeof SET_LOADING;
  payload: boolean;
};

export type PlayersSelectionAction = SetPlayers | SetLoading;
export type AsyncSetPlayersAction = Thunky<PlayersSelectionAction>;
