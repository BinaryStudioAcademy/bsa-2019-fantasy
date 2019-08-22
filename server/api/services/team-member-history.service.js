import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';
import playerRepository from '../../data/repositories/player.repository';
import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';
import { getPlayerScoreByGameweeks } from './player-match.service';

export const getPlayersByGameweekId = async (id) => {
  const result = await teamMemberHistoryRepository.getByGameweekId(id);
  return result;
};

export const getPlayerHistoryByGameweekId = async (id, gameweekNumber) => {
  console.log(gameweekNumber);
  const result = [];
  await Promise.all(
    await teamMemberHistoryRepository
      .getByGameweekId(id)
      .map((el) => el.get({ plain: true }))
      .map(async (item) => {
        const score = await getPlayerScoreByGameweeks(item.player_id, gameweekNumber);
        result.push({
          ...item,
          player_stats: { ...item.player_stats, player_score: score },
        });
      }),
  );
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
  console.log(result);

  return result;
};
