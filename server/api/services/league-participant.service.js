import leagueParticipantRepository from '../../data/repositories/league-participant.repository';

export const getleagueParticipantById = async participantId =>
    await leagueParticipantRepository.getById(participantId);
