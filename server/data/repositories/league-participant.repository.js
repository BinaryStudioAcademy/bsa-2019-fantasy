import { LeagueParticipantModel, LeagueModel } from '../models';
import BaseRepository from './base.repository';

class LeagueParticipantRepository extends BaseRepository {
  addParticipant(data) {
    return this.create(data);
  }

  getLeaguesByUserId(participant_id) {
    return this.model.findAll({
      where: { participant_id },
      attributes: ['is_creator', 'current_rank', 'last_rank'],
      include: [
        {
          model: LeagueModel,
          as: 'league',
          attributes: ['name', 'private'],
        },
      ],
    });
  }

  getByLeagueAndId(participant_id, league_id) {
    return this.model.findAll({
      where: { participant_id, league_id },
    });
  }
}

export default new LeagueParticipantRepository(LeagueParticipantModel);
