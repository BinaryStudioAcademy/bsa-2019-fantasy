import callWebApi from 'helpers/webApiHelper';

export const getGameweeks = async () => {
  const response = await callWebApi({
    endpoint: `/api/gameweeks`,
    type: 'GET',
  });
  return response.json();
};

export const getGamesById = async (id: any) => {
  const response = await callWebApi({
    endpoint: `/api/games/${id}/gameweek`,
    type: 'GET',
  });
  return response.json();
};

export const getGameDetailsById = async (id: string) => {
  const response = await callWebApi({
    endpoint: `/api/events/game/${id}`,
    type: 'GET',
  });
  return response.json();
};
