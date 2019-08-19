import { TeamMemberHistoryModel } from '../models/index';
import BaseRepository from './base.repository';

class TeamMemberHistoryRepository extends BaseRepository {
  getByGameweekId(gameweek_history_id) {
    return this.model.findAll({
      where: { gameweek_history_id },
      include: 'player_stats',
    });
  }

  createTeamMemberHistory(teamMemberHistory, gameweekHistoryId) {
    return teamMemberHistory.map((el) =>
      this.model.create({
        ...el,
        player_id: el.player_id,
        gameweek_history_id: gameweekHistoryId,
      }),
    );
  }

  deleteByGameweekId(gameweek_history_id) {
    return this.model.destroy({ where: { gameweek_history_id } });
  }
}

export default new TeamMemberHistoryRepository(TeamMemberHistoryModel);
