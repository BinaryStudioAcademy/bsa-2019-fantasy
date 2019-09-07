import {
  SET_PLAYERS,
  RESET_PLAYERS,
  TopTransfersAction,
} from './action.type';

import { PlayerType } from 'types/player.types';

type State = {
  players: PlayerType[];
};

const initialState: State = {
  players: [],
};

export default (state = initialState, action: TopTransfersAction) => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload.rows,
      };

    case RESET_PLAYERS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};