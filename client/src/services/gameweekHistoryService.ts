import callWebApi from 'helpers/webApiHelper';

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

export const postGameweekHistoryForUserById = async (
  userId: string,
  gameweekId: string,
  request,
) => {
  const response = await callWebApi({
    endpoint: `/api/gameweek-history/user-team/${userId}/${gameweekId}`,
    type: 'POST',
    request,
  });
  return response.json();
};
