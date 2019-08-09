import { FootballClub } from '../models/index';
import BaseRepository from './base.repository';

class FootballClubRepository extends BaseRepository {
    getById(id) {
        return this.model.findOne({ where: { id } });
    }
}

export default new FootballClubRepository(FootballClub);
