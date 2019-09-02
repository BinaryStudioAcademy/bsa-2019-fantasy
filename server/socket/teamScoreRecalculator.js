/* eslint-disable no-console */
import moment from 'moment';

import userRepository from '../data/repositories/user.repository';
import gameweekHistoryRepository from '../data/repositories/gameweek-history.repository';
import teamMemberHistoryReposiory from '../data/repositories/team-member-history.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';

const recalculateTeamsScore = async () => {
  const gameweeks = await gameweekRepository.getAll();
  const currentGameweek = gameweeks.find((w) => {
    const now = moment().add(2, 's');
    return moment(w.start).isBefore(now) && moment(w.end).isAfter(now);
  });

  if (!currentGameweek) {
    return;
  }

  const users = await userRepository.getAll();
  users.map(async (user) => {
    let score = 0;

    const gameweekHistory = await gameweekHistoryRepository.getByUserGameweekId(
      user.id,
      currentGameweek.id,
    );
    if (!gameweekHistory) return;

    const teamMemberHistories = await teamMemberHistoryReposiory.getByGameweekId(
      gameweekHistory.id,
    );

    [...teamMemberHistories].forEach(({ is_on_bench, is_captain, player_stats }) => {
      if (!is_on_bench) {
        if (is_captain) {
          score += 2 * player_stats.player_score;
        } else {
          score += player_stats.player_score;
        }
      }
    });
    if (gameweekHistory.team_score !== score) {
      const result = await gameweekHistoryRepository.setTeamScoreById(
        gameweekHistory.id,
        score,
      );

      console.log(result);
    } else {
      console.log('team score have not been changed');
    }
  });
};

export default recalculateTeamsScore;
