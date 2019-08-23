import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';
import gameweekRepository from '../../data/repositories/gameweek.repository';

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
export const getHistoryByGameweeks = async (gameweeks) => {
  const getGameweekId = (gameweek) => {
    const { id } = gameweek;
    return id;
  };
  const ids = gameweeks.map((g) => getGameweekId(g));
  const result = await gameweekHistoryRepository.getByGameweekId(ids);

  return result;
};
export const getGameweekHistoryForUser = async (userId) => {
  const result = await gameweekHistoryRepository.getGameweekHistoryForUser(userId);

  return result;
};
const getTeamScore = (gameweekHistory) => {
  const { team_score } = gameweekHistory;
  return team_score;
};
export const getAverageGameweekScore = (gameweekResults) => {
  return (
    gameweekResults.map((gr) => getTeamScore(gr)).reduce((p, c) => p + c, 0) /
    gameweekResults.length
  );
};

export const getMaxGameweekScore = (gameweekResults) => {
  return Math.max(...gameweekResults.map((gr) => getTeamScore(gr)));
};

export const getGameweeksStatistics = (histories) => {
  const gameweekIds = new Set([...histories].map((h) => h.gameweek_id));
  // const getGameweek = (gameweekId) => {
  //   const result = gameweekRepository.getById(gameweekId);
  //   return result;
  // };
  // const getGameweekNumber = (gameweek) => {
  //   const { number } = gameweek;

  //   return number;
  // };

  let result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < [...gameweekIds].length; i++) {
    result = [
      ...result,
      {
        gameweek: [...gameweekIds][i],
        average: getAverageGameweekScore(
          [...histories].filter((h) => h.gameweek_id === [...gameweekIds][i]),
        ),
        max: getMaxGameweekScore(
          [...histories].filter((h) => h.gameweek_id === [...gameweekIds][i]),
        ),
      },
    ];
  }
  return result;
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
