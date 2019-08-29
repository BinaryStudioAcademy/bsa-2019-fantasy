import { Thunky } from "store/types";
import { EntryHistoryType } from "types/entryHistory.types";

export const SET_GAMEWEEKS_ENTRY_HISTORY = 'ENTRY_HISTORY:SET_GAMEWEEKS_ENTRY_HISTORY';

type SetGameweeksEntryHistory = {
  type: string;
  payload: EntryHistoryType[];
};

export type AsyncSetGameweekEntryHistoryAction = Thunky<SetGameweeksEntryHistory>;
