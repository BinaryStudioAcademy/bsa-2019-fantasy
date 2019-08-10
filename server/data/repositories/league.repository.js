import { LeagueModel } from '../models/index';
import BaseRepository from './base.repository';

class LeagueRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
}

export default new LeagueRepository(LeagueModel);
