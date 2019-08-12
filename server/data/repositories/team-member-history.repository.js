import { TeamMemberHistoryModel } from '../models/index';
import BaseRepository from './base.repository';

class TeamMemberHistoryRepository extends BaseRepository {
  getByGameweekId(gameweek_history_id) {
    return this.model.findAll({ where: { gameweek_history_id } });
  }
}

export default new TeamMemberHistoryRepository(TeamMemberHistoryModel);
