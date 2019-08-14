import leagueRepository from '../../data/repositories/league.repository';

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
