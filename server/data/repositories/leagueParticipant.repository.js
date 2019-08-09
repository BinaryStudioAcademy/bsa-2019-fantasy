import { LeagueParticipantModel } from '../models/index';
import BaseRepository from './base.repository';

class LeagueParticipantRepository extends BaseRepository {}

export default new LeagueParticipantRepository(LeagueParticipantModel);
