import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';

export const getPlayersByGameweekId = async (id) => {
  const result = await teamMemberHistoryRepository.getByGameweekId(id);
  return result;
};
