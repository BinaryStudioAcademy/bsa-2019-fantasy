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

export const getLeaguesByUserId = async (id) => {
  const result = await leagueParticipantRepository.getLeaguesByUserId(id);
  return result;
};

export const getLeaguesByName = async (name) => {
  const result = await leagueRepository.getAllByName(name);
  return result;
};

export const getLeaguesByNameOrId = async (filter) => {
  const result = await leagueRepository.getAllByFilter(filter);
  return result;
};

export const getPublicLeagues = async () => {
  const result = await leagueRepository.getAllPublic();
  return result;
};

export const createLeague = (name) =>
  leagueRepository.create({
    name,
    private: false,
  });

export const updateLeague = async (id, data) => leagueRepository.updateById(id, data);

export const deleteLeagueById = async (id) => leagueRepository.deleteById(id);

export const joinLeague = async (participant_id, league_id, is_creator) => {
  const newParticipant = await leagueParticipantRepository.addParticipant({
    is_creator,
    league_id,
    participant_id,
    current_rank: 0,
    last_rank: 0,
  });

  return newParticipant;
};

export const joinGlobalLeague = async (participant_id, league_name) => {
  const { id } = await leagueRepository.getByName(league_name);

  const newParticipant = await leagueParticipantRepository.addParticipant({
    is_creator: false,
    league_id: id,
    participant_id,
    current_rank: 0,
    last_rank: 0,
  });

  return newParticipant;
};
