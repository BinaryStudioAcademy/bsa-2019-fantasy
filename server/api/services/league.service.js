import leagueRepository from '../../data/repositories/league.repository';
import leagueParticipantRepository from '../../data/repositories/league-participant.repository';
import gameweekRepository from '../../data/repositories/gameweek.repository';

export const getLeagueById = async (id) => {
  const result = await leagueRepository.getById(id);
  return result;
};

export const getLeaguesByUserId = async (id) => {
  const result = await leagueParticipantRepository.getLeaguesByUserId(id);
  return result;
};

export const getLeagueByName = async (name) => {
  const result = await leagueRepository.getByName(name);
  return result;
};

export const searchLeaguesByName = async (name) => {
  const result = await leagueRepository.getAllByName(name);
  return result;
};

export const getPublicLeagues = async () => {
  const result = await leagueRepository.getAllPublic();
  return result;
};

export const createLeague = async (data) => {
  const { name, start_from } = data;
  const { id } = await gameweekRepository.getByNumber(start_from);

  return leagueRepository.create({
    name,
    private: data.private,
    start_from: id,
  });
};

export const updateLeague = async (id, data) => leagueRepository.updateById(id, data);

export const deleteLeagueById = async (id) => leagueRepository.deleteById(id);

export const joinLeagueById = async (participant_id, league_id, is_creator) => {
  const newParticipant = await leagueParticipantRepository.addParticipant({
    is_creator,
    league_id,
    participant_id,
    current_rank: 0,
    last_rank: 0,
  });

  return newParticipant;
};

export const joinLeagueByName = async (participant_id, league_name, is_creator) => {
  const { id } = await leagueRepository.getByName(league_name);

  const newParticipant = await leagueParticipantRepository.addParticipant({
    is_creator,
    league_id: id,
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

export const getLeagueParams = async (name) => {
  const result = await leagueRepository.getByName(name);
  return result;
};
