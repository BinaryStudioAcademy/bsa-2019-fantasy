import { EventModel } from '../models/index';
import BaseRepository from './base.repository';

class EventRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
}

export default new EventRepository(EventModel);
