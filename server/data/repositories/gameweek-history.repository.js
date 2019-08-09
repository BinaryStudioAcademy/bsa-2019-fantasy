import { GameweekHistoryModel } from '../models/index';
import BaseRepository from './base.repository';

class GameweekHistoryRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
}

export default new GameweekHistoryRepository(GameweekHistoryModel);
