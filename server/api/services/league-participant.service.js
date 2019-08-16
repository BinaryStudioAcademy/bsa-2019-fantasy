import leagueParticipantRepository from '../../data/repositories/league-participant.repository';

export const getleagueParticipantById = async (participantId) => {
  const result = await leagueParticipantRepository.getById(participantId);
  return result;
};

export const checkIfAParticipant = async (participantId, leagueId) => {
  const result = await leagueParticipantRepository.getByLeagueAndId(
    participantId,
    leagueId,
  );
  return result;
};
