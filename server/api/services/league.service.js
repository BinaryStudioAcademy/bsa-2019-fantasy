import leagueRepository from '../../data/repositories/league.repository';
import leagueParticipantRepository from '../../data/repositories/league-participant.repository';

export const getAllLeagues = async () => {
  const result = await leagueRepository.getAll();
  return result;
};

export const getLeagueById = async (id) => {
  const result = await leagueRepository.getById(id);
  return result;
};

export const getPublicLeagues = async () => {
  const result = await leagueRepository.getAllPublic();
  return result;
};

export const createLeague = (id, data) =>
  leagueRepository.create({
    ...data,
    id,
  });

export const updateLeague = async (id, data) => leagueRepository.updateById(id, data);

export const deleteLeagueById = async (id) => leagueRepository.deleteById(id);

export const joinLeague = async (participant_id, league_id) => {
  const newParticipant = await leagueParticipantRepository.addParticipant({
    is_creator: false,
    league_id,
    participant_id,
  });

  return newParticipant;
};

export const joinGlobalLeague = async (participant_id) => {
  const { id } = await leagueRepository.getByName('Overall');

  const newParticipant = await leagueParticipantRepository.addParticipant({
    is_creator: false,
    league_id: id,
    participant_id,
  });

  return newParticipant;
};
