import { recalculateLeagueRankings } from '../../helpers/calculate-league-rank.js';

import leagueParticipantRepository from '../../data/repositories/league-participant.repository';
import leagueRepository from '../../data/repositories/league.repository';

export const getleagueParticipantById = async (participantId) => {
  const result = await leagueParticipantRepository.getById(participantId);
  return result;
};

export const getUserRankings = async (participantId) => {
  const result = await leagueParticipantRepository.getLeaguesByUserId(participantId);
  return result;
};

export const checkIfAParticipantById = async (participantId, leagueId) => {
  const result = await leagueParticipantRepository.getByLeagueAndId(
    participantId,
    leagueId,
  );
  return result;
};

export const checkIfAParticipantByName = async (participantId, leagueName) => {
  const { id } = await leagueRepository.getByName(leagueName);

  const result = await leagueParticipantRepository.getByLeagueAndId(participantId, id);
  return result;
};

export const getLeagueParticipants = async (leagueId) => {
  const result = await leagueParticipantRepository.getLeagueParticipants(leagueId);
  return result.map((el) => el.get({ plain: true }));
};

export const leaveLeague = async (participantId, leagueId) => {
  const result = await leagueParticipantRepository.deleteParticipation(
    participantId,
    leagueId,
  );

  recalculateLeagueRankings(leagueId);
  
  return result;
};
