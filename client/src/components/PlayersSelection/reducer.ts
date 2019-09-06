import {
  SET_PLAYERS,
  SET_AUTOPICK_SQUAD,
  SET_LOADING,
  PlayersSelectionAction,
} from './action.type';

import { PlayerType } from 'types/player.types';

type State = {
  players: PlayerType[];
  autoPick: PlayerType[];
  isLoading: boolean;
  count: number;
};

const initialState: State = {
  isLoading: true,
  players: [],
  autoPick: [],
  count: 0,
};

export default (state = initialState, action: PlayersSelectionAction) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload.rows,
        count: action.payload.count,
        isLoading: false,
      };

    case SET_AUTOPICK_SQUAD:
      return { ...state, autoPick: action.payload };

    default:
      return state;
  }
};
