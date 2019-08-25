import callWebApi from 'helpers/webApiHelper';
import {
  CreateLeagueCredentials,
  JoinLeagueCredentials,
  SearchPublicLeaguesCredentials,
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

export const joinLeague = async (request: JoinLeagueCredentials) => {
  const privacy = request.private ? 'private' : 'public';

  const response = await callWebApi({
    endpoint: `/api/leagues/join/${privacy}`,
    type: 'POST',
    request,
  });

  return response.json();
};

export const searchPublicLeagues = async (request: SearchPublicLeaguesCredentials) => {
  const response = await callWebApi({
    endpoint: `/api/leagues/search/public`,
    type: 'POST',
    request,
  });

  return response.json();
};

export const getInvitationCode = async (request: { name: string }) => {
  const response = await callWebApi({
    endpoint: `/api/leagues/invitation-code`,
    type: 'POST',
    request,
  });

  return response.json();
};

export const getLeagueDetails = async (request: { name: string }) => {
  const response = await callWebApi({
    endpoint: `/api/leagues/${request.name}`,
    type: 'GET',
  });

  return response.json();
};

export const leaveLeague = async (request: { name: string }) => {
  const response = await callWebApi({
    endpoint: `/api/league-participant`,
    type: 'DELETE',
    request,
  });

  return response.json();
};
