import * as gameweekHistoryService from '../api/services/gameweek-history.service.js';

import leagueRepository from '../data/repositories/league.repository.js';
import leagueParticipantRepository from '../data/repositories/league-participant.repository.js';
import gameweekHistoryRepository from '../data/repositories/gameweek-history.repository.js';
import gameweekRepository from '../data/repositories/gameweek.repository.js';

const recalculateLeagueRankingsAfterEvent = async () => {
  try {
    const leagues = await leagueRepository.getAll();

    await Promise.all(
      leagues.map(async (league) => {
        const { id, start_from } = league;
        recalculateLeagueRankings(id);
      }),
    );
    console.log('>>> Recalculated league rankings');
  } catch (err) {
    console.log(err);
  }
};

const recalculateLeagueRankings = async (league_id) => {
  const { id, start_from } = await leagueRepository.getById(league_id);

  const users = await leagueParticipantRepository.getLeagueParticipants(id);
  const startScoringGameweek = await gameweekRepository.getById(start_from);

  const res = [];
  await Promise.all(
    users.map(async (item) => {
      let total_points = 0;
      const userGameweekHistory = await gameweekHistoryService.getHistoriesByUserId(
        item.user.id,
      );
      userGameweekHistory.forEach((data) => {
        if (startScoringGameweek.number <= data.gameweek.number) {
          total_points += data.team_score;
        }
      });

      res.push({ ...item, total_points });
    }),
  );

  res.sort((a, b) => parseFloat(b.total_points) - parseFloat(a.total_points));

  await Promise.all(
    res.map(async (item, index) => {
      await leagueParticipantRepository.updateById(item.dataValues.id, {
        current_rank: index + 1,
        last_rank: item.current_rank,
      });
    }),
  );
};

export { recalculateLeagueRankingsAfterEvent, recalculateLeagueRankings };