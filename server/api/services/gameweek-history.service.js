import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';

export const getAllHistory = async () =>
  await gameweekHistoryRepository.getAll();

export const getHistoryById = async id => {
  const {
    team_players_id,
    team_bench_player_id,
    team_captain_id,
    gameweek_active_id
  } = await gameweekHistoryRepository.getById(id);
  return {
    team_players_id,
    team_bench_player_id,
    team_captain_id,
    gameweek_active_id
  };
};
