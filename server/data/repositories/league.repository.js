import Sequelize from 'sequelize';

import { LeagueModel } from '../models/index';
import BaseRepository from './base.repository';

const { Op } = Sequelize;

class LeagueRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id }, include: ['league_participants'] });
  }

  getByName(name) {
    return this.model.findOne({ where: { name } });
  }

  getAllPublic() {
    return this.model.findAll({
      where: { private: false },
    });
  }

  getAllByName(name) {
    return this.model.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        private: false,
      },
    });
  }
}

export default new LeagueRepository(LeagueModel);
