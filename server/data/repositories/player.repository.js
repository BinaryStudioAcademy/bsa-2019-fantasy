import { PlayerStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerRepository extends BaseRepository {
  async getFilteredPlayers(filter = {}) {
    const { name, position, club } = filter;

    if (!name && !position && !club) {
      return this.model.findAll();
    }

    const where = {};
    if (name) {
      let [first_name, second_name] = name.split('_');
      first_name = first_name.split('-').join(' ');
      second_name = second_name.split('-').join(' ');
      Object.assign(where, { first_name, second_name });
    }
    if (position) {
      Object.assign(where, { position });
    }
    if (club) {
      Object.assign(where, { club_id: club });
    }

    return this.model.findAll({ where, raw: true });
  }
}

export default new PlayerRepository(PlayerStatModel);
