import { GameweekHistoryModel } from '../models/index';
import BaseRepository from './base.repository';

class GameweekHistoryRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByUserGameweekId(user_id, gameweek_id) {
    return this.model.findOne({ where: { user_id, gameweek_id } });
  }
}

export default new GameweekHistoryRepository(GameweekHistoryModel);
