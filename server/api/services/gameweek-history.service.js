import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';

export const getAllHistory = () => gameweekHistoryRepository.getAll();

export const getCurrentHistoryById = async (userId, gameweekId) => {
  const { id } = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);

  return id;
};

export const getHistoryById = async (gameweekHistoryId) => {
  const { id } = await gameweekHistoryRepository.getById(gameweekHistoryId);
  return id;
};

export const postCurrentHistoryById = async (userId, gameweekId) => {
  let history = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);
  if (!history) {
    history = await gameweekHistoryRepository.addByUserGameweekId(userId, gameweekId);
  }

  return history.id;
};

export const getHistoriesByUserId = async (userId) => {
  const histories = await gameweekHistoryRepository.getByUserId(userId);

  const now = new Date();
  const finishedHistories = histories.filter((history) => history.gameweek.start < now);

  return finishedHistories;
};

export const getHistoryByGameweekId = async (gameweekId) => {
  const result = await gameweekHistoryRepository.getByGameweekId(gameweekId);

  return result;
};

export const getAverageGameweekScore = (gameweekResults) => {
  return (
    gameweekResults.map((gr) => gr.team_score).reduce((p, c) => p + c, 0) /
    gameweekResults.length
  );
};

export const getMaxGameweekScore = (gameweekResults) => {
  return Math.max(...gameweekResults.map((gr) => gr.team_score));
};

export const getBestPlayersOfTheGameweek = (players) => {
  const getPlayerStats = (player) => {
    const { player_stats } = player;
    return player_stats;
  };
  const getPlayerInfo = (player) => {
    const {
      id,
      first_name,
      second_name,
      player_price,
      player_score,
      position,
      goals,
      assists,
      missed_passes,
      goals_conceded,
      saves,
      yellow_cards,
      red_cards,
      code,
      club_id,
      createdAt,
      updatedAt,
    } = player;
    return {
      id,
      first_name,
      second_name,
      player_price,
      player_score,
      position,
      goals,
      assists,
      missed_passes,
      goals_conceded,
      saves,
      yellow_cards,
      red_cards,
      code,
      club_id,
      createdAt,
      updatedAt,
    };
  };

  //  players' info
  players.map((p) => getPlayerStats(p)).map((p) => getPlayerInfo(p));

  // left only unique players
  const uniquePlayers = new Set([...players]);
  //  sort them by player_score in descending order
  const bestPlayers = [...uniquePlayers]
    .sort((a, b) => b.player_score - a.player_score)
    .slice(0, 11);

  return bestPlayers;
};
