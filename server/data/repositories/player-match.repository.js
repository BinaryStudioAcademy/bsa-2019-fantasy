import { PlayerMatchStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerMatchRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
}

export default new PlayerMatchRepository(PlayerMatchStatModel);
