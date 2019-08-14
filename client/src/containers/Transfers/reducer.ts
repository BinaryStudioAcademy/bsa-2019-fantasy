import { SET_PLAYERS, setPlayersAction } from './action.type';

import { Player } from 'types/player.types';

type State = {
  players?: Player[];
};

const initialState: State = {
  players: [],
};

export default (state = initialState, action: setPlayersAction) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { ...state, players: action.payload };
    default:
      return state;
  }
};
