import userRepository from '../data/repositories/user.repository';
import gameweekHistoryRepository from '../data/repositories/gameweek-history.repository';
import teamMemberHistoryReposiory from '../data/repositories/team-member-history.repository';

const recalculateTeamsScore = async (gameweek) => {
  const users = await userRepository.getAll();

  await Promise.all(
    users.map(async (user) => {
      let score = 0;

      const gameweekHistory = await gameweekHistoryRepository.getByUserGameweekId(
        user.id,
        gameweek.id,
      );
      if (!gameweekHistory) return;

      await Promise.all(
        await teamMemberHistoryReposiory
          .getByGameweekId(gameweekHistory.id)
          .map(async ({ is_on_bench, is_captain, player_stats }) => {

            if (!is_on_bench) {
              if (is_captain) {
                score += 2 * player_stats.player_score;
              } else {
                score += player_stats.player_score;
              }
            }
          }),
      );

      console.log({ gameweek: gameweek.name, user: user.name, score });
    }),
  );

  console.log('finish');
};

export default recalculateTeamsScore;
