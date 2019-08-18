import { LeagueParticipantModel } from '../models';
import BaseRepository from './base.repository';

class LeagueParticipantRepository extends BaseRepository {
  addParticipant(data) {
    return this.create(data);
  }

  getLeaguesByUserId(participant_id) {
    return this.model.findAll({
      where: { participant_id },
      include: ['league'],
      attributes: ['is_creator', 'current_rank', 'last_rank'],
    });
  }

  getByLeagueAndId(participant_id, league_id) {
    return this.model.findAll({
      where: { participant_id, league_id },
    });
  }
}

export default new LeagueParticipantRepository(LeagueParticipantModel);
