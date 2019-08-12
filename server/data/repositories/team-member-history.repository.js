import { TeamMemberHistoryModel } from '../models/index';
import BaseRepository from './base.repository';

class TeamMemberHistoryRepository extends BaseRepository {}

export default new TeamMemberHistoryRepository(TeamMemberHistoryModel);
