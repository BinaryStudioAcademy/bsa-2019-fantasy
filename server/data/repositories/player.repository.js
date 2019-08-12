import { PlayerStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerRepository extends BaseRepository {
  async getPlayers(filter) {
    const {
      offset,
      limit,
      orderField,
      orderDirection,
      first_name,
      second_name,
      position,
      club,
    } = filter;

    const where = {};

    if (first_name) Object.assign(where, { first_name });
    if (second_name) Object.assign(where, { second_name });
    if (position) Object.assign(where, { position });
    if (club) Object.assign(where, { club });

    const order = [];
    if (orderField && orderDirection) order.push([orderField, orderDirection]);

    return this.model.findAll({ where, order, offset, limit });
  }
}

export default new PlayerRepository(PlayerStatModel);
