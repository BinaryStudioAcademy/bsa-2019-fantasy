import callWebApi from 'helpers/webApiHelper';
import {
  CreateLeagueCredentials,
  JoinPrivateLeagueCredentials,
} from 'types/league.types';

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

export const joinPrivateLeague = async (request: JoinPrivateLeagueCredentials) => {
  const response = await callWebApi({
    endpoint: `/api/leagues/join`,
    type: 'POST',
    request: { ...request, private: true },
  });

  return response.json();
};
