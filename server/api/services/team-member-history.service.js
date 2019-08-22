import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';
import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';
import playerRepository from '../../data/repositories/player.repository';

export const getPlayersByGameweekId = async (id) => {
  const result = await teamMemberHistoryRepository.getByGameweekId(id);

  return result;
};

export const getPlayersByGameweekIds = async (histories) => {
  const getHistoryId = (history) => {
    const { id } = history;
    return id;
  };

  const historyIds = histories.map((h) => getHistoryId(h));
  const result = await teamMemberHistoryRepository.getByGameweekIds(historyIds);

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

  // count total team score for the current gameweek
  let totalTeamScore = 0;
  const getPlayerInfo = async (player) => {
    const { player_score } = player;
    totalTeamScore += player_score;

    // update team_score in database
    await gameweekHistoryRepository.setTeamScoreById(gameweekHistoryId, totalTeamScore);
  };

  data.map((p) =>
    playerRepository.getById(p.player_id).then((player) => getPlayerInfo(player)),
  );

  return result;
};
