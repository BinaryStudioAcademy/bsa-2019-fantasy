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

import { TeamMemberType } from 'types/gameweekHistory.type';

const setGameweeksHistory = (gameweeksHistory: any): setGameweekHistoryAction => ({
  type: SET_GAMEWEEKS_HISTORY,
  payload: gameweeksHistory,
});

const setTeamHistory = (teamHistory: TeamMemberType[]): setTeamHistoryAction => ({
  type: SET_TEAM_HISTORY,
  payload: teamHistory,
});

const setIsLoading = (isLoading: boolean): any => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const loadGameweeksHistoryAction = (
  userId: string,
): AsyncSetGameweekHistoryAction => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await gameweekHistoryService.getGameweeksHistoryByUser(userId);
  dispatch(setGameweeksHistory(result));
  dispatch(setIsLoading(false));
};

export const loadTeamHistoryAction = (
  userId,
  gameweekId,
  currentGameweek
): AsyncSetTeamHistoryAction => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await gameweekHistoryService.getTeamHistoryForUserById(
    userId,
    gameweekId,
    currentGameweek
  );
  dispatch(setTeamHistory(result));
  dispatch(setIsLoading(false));
};
