import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';

export const getPlayersByGameweekId = async (id) => {
  const result = await teamMemberHistoryRepository.getByGameweekId(id);
  return result;
};

export const postTeamMemberHistory = async (data, gameweekHistoryId) => {
  const players = getPlayersByGameweekId(gameweekHistoryId.id);

  if (players) {
    await teamMemberHistoryRepository.deleteByGameweekId(gameweekHistoryId.id);
  }
  const result = await teamMemberHistoryRepository.createTeamMemberHistory(
    data,
    gameweekHistoryId,
  );

  return result;
};
