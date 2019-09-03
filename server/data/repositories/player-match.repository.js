import { Op } from '../db/connection';
import { PlayerMatchStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerMatchRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByIdWithGamesConstraints(player_id, gameIds) {
    return this.model.findOne({ where: { player_id, game_id: { [Op.or]: gameIds } } });
  }
}

export default new PlayerMatchRepository(PlayerMatchStatModel);
