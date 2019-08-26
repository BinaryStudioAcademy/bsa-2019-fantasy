import Sequelize, { Op } from 'sequelize';
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

  getRandomPlayers() {
    const whereSearch = (position, price, limit) => ({
      where: { position, player_price: { [Op.between]: price } },
      order: Sequelize.literal('random()'),
      limit,
    });

    const goalkeepers = this.model.findAll(whereSearch('GKP', [50, 60], 2));

    const defenfers = this.model.findAll(whereSearch('DEF', [40, 55], 4));
    const topDefender = this.model.findAll(whereSearch('DEF', [65, 70], 1));

    const middlefielders = this.model.findAll(whereSearch('MID', [45, 70], 4));
    const topMiddlefielder = this.model.findAll(whereSearch('MID', [95, 125], 1));

    const forwards = this.model.findAll(whereSearch('FWD', [60, 70], 2));
    const topForward = this.model.findAll(whereSearch('FWD', [95, 120], 1));

    return Promise.all([
      goalkeepers,
      defenfers,
      topDefender,
      middlefielders,
      topMiddlefielder,
      forwards,
      topForward,
    ]);
  }
}

export default new PlayerRepository(PlayerStatModel);
