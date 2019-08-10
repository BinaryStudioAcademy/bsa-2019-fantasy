import { GameModel } from '../models/index';
import BaseRepository from './base.repository';

class GameRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
}

export default new GameRepository(GameModel);
