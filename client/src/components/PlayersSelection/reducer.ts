import { SET_PLAYERS, PlayersSelectionAction, SET_LOADING } from './action.type';

import { PlayerType } from 'types/player.types';

type State = {
  players: PlayerType[];
  isLoading: boolean;
  count: number;
};

const initialState: State = {
  isLoading: true,
  players: [],
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

    default:
      return state;
  }
};
