import * as gameweekHistoryService from 'services/gameweekHistoryService';

import {
  SET_GAMEWEEKS_ENTRY_HISTORY, AsyncSetGameweekEntryHistoryAction
} from './action.types';
import { EntryHistoryType } from 'types/entryHistory.types';

// gameweekshistory with ranks for user
export const setGameweeksHistory = (gameweeksHistory: EntryHistoryType[]) => ({
  type: SET_GAMEWEEKS_ENTRY_HISTORY,
  payload: gameweeksHistory,
});

export const loadGameweeksEntryHistoryAction = (
  userId: string,
): AsyncSetGameweekEntryHistoryAction => async (dispatch) => {
  const gameweeksHistory = await gameweekHistoryService.getGameweeksHistoryByUser(userId);

  const gameweeksRankedHistory = await addRanksToGameweeks(userId, gameweeksHistory);

  dispatch(setGameweeksHistory(gameweeksRankedHistory as EntryHistoryType[]));
};

const addRanksToGameweeks = async (userId: string, gameweeksArray: any) => Promise.all(
  gameweeksArray.map(async (item: any) => {
    const rankObj = await gameweekHistoryService.getUserRankingForGameweek(userId, item.gameweek.id);
    item.gameweekUserRank = rankObj.rank;

    return item;
  })
)
