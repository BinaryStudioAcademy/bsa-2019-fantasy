import callWebApi from 'helpers/webApiHelper';
import { PlayerType } from 'types/player.types';

export const getPlayers = async (filter: any) => {
  const response = await callWebApi({
    endpoint: `/api/players`,
    type: 'GET',
    query: filter,
  });
  return response.json();
};

export const getRandomSquad = async (): Promise<PlayerType[]> => {
  const response = await callWebApi({
    endpoint: `/api/players/random-squad`,
    type: 'GET',
  });
  return response.json();
};

export const getPlayerById = async (id: string) => {
  const response = await callWebApi({
    endpoint: `/api/players/${id}`,
    type: 'GET',
  });
  return response.json();
};

export const getFixturesForPlayer = async (playerId: string, clubId: string) => {
  const response = await callWebApi({
    endpoint: `/api/games/player/${playerId}/${clubId}`,
    type: 'GET',
  });
  return response.json();
};

export const getUpcomingFixtureForPlayer = async (playerId: string) => {
  const response = await callWebApi({
    endpoint: `/api/player-match-stats/next-fixture/${playerId}`,
    type: 'GET',
  });
  return response.json();
};

export const getStatsForPlayer = async (playerId: string) => {
  const response = await callWebApi({
    endpoint: `/api/player-match-stats/by-gameweeks/${playerId}`,
    type: 'GET',
  });
  return response.json();
};
