import callWebApi from 'helpers/webApiHelper';

export const getEventsByGameId = async (game_id) => {
  const response = await callWebApi({
    endpoint: `/api/events/game/${game_id}`,
    type: 'GET',
  });
  return response.json();
};
