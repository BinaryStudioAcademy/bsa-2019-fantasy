import callWebApi from 'helpers/webApiHelper';
import { TeamMemberType } from 'types/gameweekHistory.type';

export const getGameweeksHistoryByUser = async (userId: string) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/user-team/${userId}`,
    type: 'GET',
  });
  return response.json();
};

export const getGameweekHistoryForUserById = async (
  userId: string,
  gameweekId: string,
) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/user-team/${userId}/${gameweekId}`,
    type: 'GET',
  });
  return response.json();
};
export const getGameweekHistoryResults = async () => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/gameweek/recent/results`,
    type: 'GET',
  });
  return response.json();
};

export const getTeamHistoryForUserById = async (
  userId: string,
  gameweekId: string,
  currentGameweek: string,
) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/history-team/${userId}/${gameweekId}/${currentGameweek}`,
    type: 'GET',
  });
  return response.json();
};

export const postGameweekHistoryForUserById = async (
  userId: string,
  gameweekId: string,
  request: TeamMemberType[],
) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/user-team/${userId}/${gameweekId}`,
    type: 'POST',
    request,
  });
  return response.json();
};
