import leagueRepository from '../data/repositories/league.repository.js';
import leagueParticipantRepository from '../data/repositories/league-participant.repository.js';
import gameweekHistoryRepository from '../data/repositories/gameweek-history.repository.js';
import gameweekRepository from '../data/repositories/gameweek.repository.js';

const recalculateLeagueRankings = async () => {
  const leagues = await leagueRepository.getAll();

  await Promise.all(
    leagues.map(async (league) => {
      const { id, start_from } = league;

      const users = await leagueParticipantRepository.getLeagueParticipants(id);
      const startScoringGameweek = await gameweekRepository.getById(start_from);

      const res = [];
      await Promise.all(
        users.map(async (item) => {
          let totalPoints = 0;

          const userGameweekHistory = await gameweekHistoryRepository.getByUserGameweekId(
            item.user.id,
          );
          userGamaweekStats.forEach((data) => {
            if (startScoringGameweek.number <= data.gameweek.number) {
              total_points += data.team_score;
            }
          });

          res.push({ ...item, total_points });
        }),
      );

      res.sort((a, b) => parseFloat(b.total_points) - parseFloat(a.total_points));

      await Promise.all(
        users.map(async (user, index) => {
          await leagueParticipantRepository.updateById(user.id, {
            current_rank: index + 1,
            last_rank: user.current_rank,
          });
        }),
      );
    }),
  );
};

export default recalculateLeagueRankings;