import callWebApi from 'helpers/webApiHelper';

export const getCurrent = async () => {
  const response = await callWebApi({
    endpoint: `/api/games/current`,
    type: 'GET',
  });
  return response.json();
};

export const getPlayed = async (count) => {
  const response = await callWebApi({
    endpoint: `/api/games/played`,
    type: 'GET',
  });
  return response.json();
};
