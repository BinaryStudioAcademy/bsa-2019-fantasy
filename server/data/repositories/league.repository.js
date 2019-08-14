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

  getAllByFilter(filter) {
    return this.model.findAll({
      where: Sequelize.or(
        {
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        },
        // TODO: fix search by id
        Sequelize.where(Sequelize.cast('id', 'varchar'), {
          [Op.iLike]: `%${filter}%`,
        }),
      ),
    });
  }
}

export default new LeagueRepository(LeagueModel);
