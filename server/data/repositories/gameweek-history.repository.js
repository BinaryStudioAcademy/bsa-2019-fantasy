import { GameweekHistoryModel } from '../models/index';
import BaseRepository from './base.repository';

const now = new Date();

class GameweekHistoryRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByUserGameweekId(user_id, gameweek_id) {
    return this.model.findOne({ where: { user_id, gameweek_id } });
  }

  getByUserId(user_id) {
    return this.model.findAll({
      where: { user_id },
      include: 'gameweek',
      attributes: ['team_score'],
    });
  }

  async setTeamScoreById(id, team_score) {
    const result = await this.model.update(
      { team_score },
      {
        where: { id },
        returning: true,
        plain: true,
      },
    );
    return result;
  }

  addByUserGameweekId(user_id, gameweek_id) {
    return this.model.create({
      createdAt: now,
      updatedAt: now,
      user_id,
      gameweek_id,
      team_score: 0
    });
  }
}
export default new GameweekHistoryRepository(GameweekHistoryModel);
