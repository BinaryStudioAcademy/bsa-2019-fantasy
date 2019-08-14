import callWebApi from 'helpers/webApiHelper';

export const getClubs = async () => {
  const response = await callWebApi({
    endpoint: `/api/clubs`,
    type: 'GET',
  });
  return response.json();
};
