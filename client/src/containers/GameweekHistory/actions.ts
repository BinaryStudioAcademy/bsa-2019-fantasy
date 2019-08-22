import * as gameweekHistoryService from 'services/gameweekHistoryService';
import {
  SET_GAMEWEEKS_HISTORY,
  SET_TEAM_HISTORY,
  SET_IS_LOADING,
  setGameweekHistoryAction,
  setTeamHistoryAction,
  AsyncSetGameweekHistoryAction,
  AsyncSetTeamHistoryAction,
} from './action.type';

import { GameweeksType, FixturesItemType } from 'types/fixtures.types';

const setGameweeksHistory = (gameweeksHistory: any): any => ({
  type: SET_GAMEWEEKS_HISTORY,
  payload: gameweeksHistory,
});

const setTeamHistory = (teamHistory: any): any => ({
  type: SET_TEAM_HISTORY,
  payload: teamHistory,
});

const setIsLoading = (isLoading: boolean): any => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const loadGameweeksHistoryAction = (userId): any => async (dispatch) => {
  const result = await gameweekHistoryService.getGameweeksHistoryByUser(userId);
  dispatch(setGameweeksHistory(result));
};

export const loadTeamHistoryAction = (userId, gameweekId): any => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await gameweekHistoryService.getTeamHistoryForUserById(
    userId,
    gameweekId,
  );
  dispatch(setTeamHistory(result));
  dispatch(setIsLoading(false));
};
