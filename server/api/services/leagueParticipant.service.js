import leagueParticipantRepository from '../../data/repositories/leagueParticipant.repository';

export const getleagueParticipantById = async participantId => {
    const participant = await leagueParticipantRepository.getById(
        participantId
    );
    return participant;
};
