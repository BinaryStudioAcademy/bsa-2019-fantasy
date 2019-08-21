import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';
import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';

export const getPlayersByGameweekId = async (id) => {
  // count total team score for the current gameweek
  let totalTeamScore = 0;
  const getPlayerInfo = async (player) => {
    const { player_score, gameweek_history_id } = player;
    totalTeamScore += player_score;
    try {
      // update team_score in database
      await gameweekHistoryRepository.setTeamScoreById(
        gameweek_history_id,
        totalTeamScore,
      );
    } catch (err) {
      totalTeamScore = 0;
    }
  };
  const result = await teamMemberHistoryRepository.getByGameweekId(id);
  result.forEach((p) => getPlayerInfo(p));
  return result;
};
export const getBestPlayersOfTheGameweek = (players) => {
  const getPlayerScore = (player) => {
    const { player_score } = player;
    return player_score;
  };

  return players
    .map((p) => getPlayerScore(p))
    .sort()
    .slice(0, 11);
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
