import { Op } from '../db/connection';
import { GameModel } from '../models/index';
import BaseRepository from './base.repository';

class GameRepository extends BaseRepository {
  getAll() {
    return this.model.findAll();
  }

  getPlayedGames({ limit = 10, order_direction = 'DESC' }) {
    const order = [['updatedAt', order_direction]];
    const where = { finished: true };
    return this.model.findAll({ where, order, limit });
  }

  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByGameweekId(id) {
    return this.model.findAll({
      where: { gameweek_id: id },
      include: ['hometeam', 'awayteam'],
      order: [['start', 'ASC']],
    });
  }

  getByClubId(id) {
    return this.model.findAll({
      where: { [Op.or]: [{ hometeam_id: id }, { awayteam_id: id }] },

      include: ['hometeam', 'awayteam'],
    });
  }

  getAllWithClubs() {
    return this.model.findAll({
      include: ['hometeam', 'awayteam'],
    });
  }

  getCurrent() {
    const now = new Date();
    return this.model.findOne({
      where: {
        start: {
          [Op.lte]: now,
        },
        finished: false,
      },
    });
  }

  getNext() {
    const now = new Date();
    return this.model.findOne({
      where: {
        start: {
          [Op.gte]: now,
        },
      },
      order: [['start', 'ASC']],
    });
  }
}

export default new GameRepository(GameModel);
