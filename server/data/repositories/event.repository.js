import { EventModel, PlayerMatchStatModel } from '../models/index';
import BaseRepository from './base.repository';

class EventRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByGameId(gameId) {
    return this.model.findAll({
      where: { game_id: gameId },
      include: 'player',
      order: [['createdAt', 'DESC']]
    })
  }
}

export default new EventRepository(EventModel);
