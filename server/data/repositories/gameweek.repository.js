import { Op } from 'sequelize';

import { GameweekModel } from '../models/index';
import BaseRepository from './base.repository';

class GameweekRepository extends BaseRepository {
  getByNumber(number) {
    return this.model.findOne({
      where: { number },
    });
  }

  getAll() {
    return this.model.findAll();
  }

  getCurrent() {
    const now = new Date();
    return this.model.findOne({
      where: {
        start: {
          [Op.lte]: now,
        },
        end: {
          [Op.gte]: now,
        },
      },
    });
  }

  getCurrentGameweek() {
    const now = new Date();
    return this.model.findOne({
      where: {
        start: {
          [Op.gte]: now,
        },
      },
    });
  }

  getNext() {
    const now = new Date();
    // return this.model.findAll({
    //   attributes: ['id', [fn('min', col('start')), 'start']],
    //   group: ['id'],
    //   raw: true,
    // });
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

export default new GameweekRepository(GameweekModel);
