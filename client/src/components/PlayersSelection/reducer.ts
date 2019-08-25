import { SET_PLAYERS, SET_AUTOPICK_SQUAD, PlayersAction } from './action.type';

import { PlayerType } from 'types/player.types';

type State = {
  players?: PlayerType[];
  autoPick?: PlayerType[];
  count: number;
};

const initialState: State = {
  players: [],
  count: 0,
};

export default (state = initialState, action: PlayersAction) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { ...state, players: action.payload.rows, count: action.payload.count };
    case SET_AUTOPICK_SQUAD:
      return { ...state, autoPick: action.payload.rows };
    default:
      return state;
  }
};
