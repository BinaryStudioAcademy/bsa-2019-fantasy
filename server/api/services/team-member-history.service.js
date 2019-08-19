import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';

export const getPlayersByGameweekId = async (id) => {
  const result = await teamMemberHistoryRepository.getByGameweekId(id);
  return result;
};

export const postTeamMemberHistory = async (data, gameweekHistoryId) => {
  const players = getPlayersByGameweekId(gameweekHistoryId);

  if (players) {
    await teamMemberHistoryRepository.deleteByGameweekId(gameweekHistoryId);
  }
  const result = await teamMemberHistoryRepository.createTeamMemberHistory(
    data,
    gameweekHistoryId,
  );

  return result;
};
