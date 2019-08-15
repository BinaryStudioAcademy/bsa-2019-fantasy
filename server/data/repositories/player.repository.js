import { Op } from 'sequelize';
import { PlayerStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerRepository extends BaseRepository {
  async getPlayers({
    offset,
    limit,
    order_field,
    order_direction,
    first_name,
    second_name,
    position,
    club_id,
    max_price,
    min_price,
  }) {
    // do not include if undefined
    const where = {
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

    const order = [];
    if (order_field && order_direction) order.push([order_field, order_direction]);

    return this.model.findAll({ where, order, offset, limit });
  }
}

export default new PlayerRepository(PlayerStatModel);
