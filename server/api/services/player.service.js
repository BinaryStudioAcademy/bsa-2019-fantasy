import playerRepository from '../../data/repositories/player.repository';

export const getPlayers = (filter) => playerRepository.getPlayers(filter);

export const getPlayerById = async (playerId) => {
  const {
    first_name,
    second_name,
    player_price,
    player_score,
    position,
    goals,
    assists,
    missed_passes,
    club_id,
    code,
    goals_conceded,
    saves,
    yellow_cards,
    red_cards,
  } = await playerRepository.getById(playerId);
  return {
    first_name,
    second_name,
    player_price,
    player_score,
    position,
    goals,
    assists,
    missed_passes,
    club_id,
    code,
    goals_conceded,
    saves,
    yellow_cards,
    red_cards,
  };
};
