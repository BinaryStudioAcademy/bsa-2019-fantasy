import callWebApi from 'helpers/webApiHelper';
import { Club } from 'types/club.type';

export const getClubs = async (): Promise<Club[]> => {
  const response = await callWebApi({
    endpoint: '/api/clubs',
    type: 'GET',
  });
  return response.json();
};
