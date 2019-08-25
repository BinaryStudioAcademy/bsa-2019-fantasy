import { SET_PLAYERS, setPlayersAction } from './action.type';

import { PlayerType } from 'types/player.types';

type State = {
  players?: PlayerType[];
  count: number;
};

const initialState: State = {
  players: [],
  count: 0,
};

export default (state = initialState, action: setPlayersAction) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { ...state, players: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};
