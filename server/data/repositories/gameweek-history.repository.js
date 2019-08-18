import { GameweekHistoryModel } from '../models/index';
import BaseRepository from './base.repository';
import moment from 'moment';

class GameweekHistoryRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByUserGameweekId(user_id, gameweek_id) {
    return this.model.findOne({ where: { user_id, gameweek_id } });
  }

  getByUserId(user_id) {
    const now = new Date();
    return this.model.findAll({ 
      where: { user_id }, 
      include: 'gameweek',
      attributes: ['team_score']
    });
  }

  async setTeamScoreById(id, team_score) {
    const result = await this.model.update({ team_score }, {
      where: { id },
      returning: true,
      plain: true,
    });
    return result
  }
}

export default new GameweekHistoryRepository(GameweekHistoryModel);
