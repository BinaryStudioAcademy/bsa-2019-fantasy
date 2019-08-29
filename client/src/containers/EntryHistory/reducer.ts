import {
  SET_GAMEWEEKS_ENTRY_HISTORY,
} from './action.types';
import { EntryHistoryType } from 'types/entryHistory.types';

type State = {
  gameweeksEntryHistory: EntryHistoryType[];
};

const initialState: State = {
  gameweeksEntryHistory: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GAMEWEEKS_ENTRY_HISTORY:
      return {...state, gameweeksEntryHistory: action.payload}
    default:
      return state;
  }
};
