import { LOAD_GAMEWEEKS, GameweekAction, SET_GAMEWEEKS, SET_GAMES } from './action.type';

type State = {
  gameweeks?: any;
  games?: any;
};

const initialState: State = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GAMEWEEKS:
      return { ...state, gameweeks: action.payload };
    case SET_GAMES:
      return { ...state, games: action.payload };
    default:
      return state;
  }
};
