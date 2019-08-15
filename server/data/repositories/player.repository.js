import sequelize, { Op } from 'sequelize';
import { PlayerStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerRepository extends BaseRepository {
  async getPlayers({
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
    console.log(search);
    // const search_query =
    //   search &&
    //   sequelize.where(
    //     // sequelize.fn('LOWER', sequelize.col('second_name')),
    //     'second_name',
    //     'LIKE',
    //     `% + ${search.toLowerCase()} + %`,
    //   );

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

    const whereSearch = {
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
    };

    const where = { ...whereSearch, ...whereFilter };
    console.log(where);

    const order = [];
    if (order_field && order_direction) order.push([order_field, order_direction]);

    return this.model.findAll({ where, order, offset, limit });
  }
}

export default new PlayerRepository(PlayerStatModel);
