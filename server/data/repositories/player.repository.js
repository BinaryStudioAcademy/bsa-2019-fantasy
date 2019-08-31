import { Op } from 'sequelize';
import sequelize from '../db/connection';
import { PlayerStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerRepository extends BaseRepository {
  getPlayers({
    offset,
    limit,
    order_field,
    order_direction,
    search,
    first_name,
    second_name,
    position,
    club_id,
    max_price,
    min_price,
  }) {
    const whereFilter = {
      ...(first_name && { first_name }),
      ...(second_name && { second_name }),
      ...(position && { position }),
      ...(club_id && { club_id }),
      ...((max_price || min_price) && {
        player_price: {
          ...(max_price && { [Op.lte]: max_price }),
          ...(min_price && { [Op.gte]: min_price }),
        },
      }),
    };

    const whereSearch = search
      ? {
          [Op.or]: [
            {
              first_name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              second_name: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    const where = { ...whereSearch, ...whereFilter };

    const order = [];
    if (order_field && order_direction) order.push([order_field, order_direction]);

    return this.model.findAndCountAll({ where, order, offset, limit });
  }

  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByIdAndClubId(id, club_id) {
    return this.model.findOne({ where: { id, club_id } });
  }

  getRandomPlayers() {
    const query = (position, limit, condition) => `SELECT DISTINCT ON (club_id) *
     FROM (select * from player_stats WHERE position='${position}' AND (${condition}) ORDER BY random() LIMIT 10) 
     as players LIMIT ${limit};`;

    const goalkeepers = sequelize.query(query('GKP', 2, "club_id='7' OR club_id='12'"), {
      type: sequelize.QueryTypes.SELECT,
    });

    const defenfers = sequelize.query(query('DEF', 5, 'club_id NOT IN (7, 12)'), {
      type: sequelize.QueryTypes.SELECT,
    });

    const middlefielders = sequelize.query(query('MID', 5, 'club_id NOT IN (7, 12)'), {
      type: sequelize.QueryTypes.SELECT,
    });

    const forwards = sequelize.query(query('FWD', 3, 'club_id NOT IN (7, 12)'), {
      type: sequelize.QueryTypes.SELECT,
    });

    return Promise.all([goalkeepers, defenfers, middlefielders, forwards]);
  }
}

export default new PlayerRepository(PlayerStatModel);
