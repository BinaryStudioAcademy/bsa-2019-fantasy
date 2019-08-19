import { GameweekModel } from '../models/index';
import BaseRepository from './base.repository';

class GameweekRepository extends BaseRepository {
  getByNumber(number) {
    return this.model.findOne({
      where: { number },
    });
  }
}

export default new GameweekRepository(GameweekModel);
