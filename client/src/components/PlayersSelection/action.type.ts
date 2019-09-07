import { Thunky } from 'store/types';
import { PlayerType } from 'types/player.types';

export const SET_LOADING = 'PLAYERS_SELECTION:SET_LOADING';
export const SET_PLAYERS = 'PLAYERS_SELECTION:SET_PLAYERS';
export const SET_AUTOPICK_SQUAD = 'PLAYERS:SET_AUTOPICK_SQUAD';

type SetPlayers = {
  type: typeof SET_PLAYERS;
  payload: { rows: PlayerType[]; count: number };
};

type SetLoading = {
  type: typeof SET_LOADING;
  payload: boolean;
};

type SetAutoPick = {
  type: typeof SET_AUTOPICK_SQUAD;
  payload: PlayerType[];
};

export type PlayersSelectionAction = SetPlayers | SetLoading | SetAutoPick;
export type AsyncPlayersSelectionAction = Thunky<PlayersSelectionAction>;
