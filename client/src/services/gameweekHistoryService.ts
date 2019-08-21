import callWebApi from 'helpers/webApiHelper';
import { TeamMemberType } from 'types/gameweekHistory.type';

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
export const getGameweekHistoryByGameweekId = async (gameweekId: string) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/gameweek/results/${gameweekId}`,
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
