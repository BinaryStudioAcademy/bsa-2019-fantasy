import { LeagueModel } from '../models/index';
import BaseRepository from './base.repository';

class LeagueRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getAllPublic() {
    return this.model.findAll({
      where: { private: false },
    });
  }
}

export default new LeagueRepository(LeagueModel);
