import { Op } from '../db/connection';
import { GameModel } from '../models/index';
import BaseRepository from './base.repository';

class GameRepository extends BaseRepository {
  getAll() {
    return this.model.findAll();
  }

  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByGameweekId(id) {
    return this.model.findAll({
      where: { gameweek_id: id },

      include: ['hometeam', 'awayteam'],
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
