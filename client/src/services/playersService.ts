import callWebApi from 'helpers/webApiHelper';

export const getPlayers = async () => {
  const response = await callWebApi({
    endpoint: `/api/players`,
    query: { limit:40 },
    type: 'GET',
  });
  return response.json();
};

export const getPlayersBy = async (query: any) => {
  const response = await callWebApi({
    endpoint: `/api/players`,
    query: query,
    type: 'GET',
  });
  return response.json();
};
