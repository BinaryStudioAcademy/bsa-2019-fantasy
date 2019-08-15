import { LeagueParticipantModel } from '../models';
import BaseRepository from './base.repository';

class LeagueParticipantRepository extends BaseRepository {
  addParticipant(data) {
    return this.create(data);
  }
}

export default new LeagueParticipantRepository(LeagueParticipantModel);
