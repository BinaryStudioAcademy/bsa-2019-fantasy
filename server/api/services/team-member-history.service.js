import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';
import { getPlayerById } from './player.service';

export const getPlayersByGameweekId = async (id) => {
  const { player_id, is_captain, is_on_bench } = await teamMemberHistoryRepository.getById(id);
  return { player_id, is_captain, is_on_bench };
};