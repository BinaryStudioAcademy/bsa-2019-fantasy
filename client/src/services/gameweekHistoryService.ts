import callWebApi from 'helpers/webApiHelper';

export const getGameweekHistoryForUserById = async (userId: any, gameweekId: any) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/user-team/${userId}/${gameweekId}`,
    type: 'GET',
  });
  return response.json();
};
