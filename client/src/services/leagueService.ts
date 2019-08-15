import callWebApi from 'helpers/webApiHelper';
import { CreateLeagueCredentials } from 'types/league.types';

export const createLeague = async (request: CreateLeagueCredentials) => {
  const response = await callWebApi({
    endpoint: `/api/leagues`,
    type: 'POST',
    request,
  });

  return response.json();
};

export const getUserLeagues = async () => {
  const response = await callWebApi({
    endpoint: `/api/profile/leagues`,
    type: 'GET',
  });

  return response.json();
};
