import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';
import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';
import playerMatchRepository from '../../data/repositories/player-match.repository';
import gameweekRepository from '../../data/repositories/gameweek.repository';
import gameRepository from '../../data/repositories/game.repository';

export const getPlayersByGameweekId = async (id) => {
  const result = await teamMemberHistoryRepository.getByGameweekId(id);

  return result;
};

export const getPlayerHistoryByGameweekId = async (id, gameweekNumber) => {
  const result = [];
  const games = await gameRepository.getByGameweekId(gameweekNumber);
  const gameIds = games.map((el) => el.id);
  await Promise.all(
    await teamMemberHistoryRepository
      .getByGameweekId(id)
      .map((el) => el.get({ plain: true }))
      .map(async (item) => {
        const { player_score } = await playerMatchRepository.getByIdWithGamesConstraints(
          item.player_id,
          gameIds,
        );
        result.push({
          ...item,
          player_stats: {
            ...item.player_stats,
            player_score: item.is_captain ? player_score * 3 : player_score,
          },
        });
      }),
  );
  return result;
};

export const getPlayersByGameweekIds = async (histories) => {
  const getHistoryId = (history) => {
    const { id } = history;
    return id;
  };

  const historyIds = histories.map((h) => getHistoryId(h));
  const result = await teamMemberHistoryRepository.getByGameweekIds(historyIds);

  return result;
};

export const getBestPlayersOfTheGameweek = (players) => {
  const getPlayerScore = (player) => {
    const { player_score } = player;
    return player_score;
  };

  return players
    .map((p) => getPlayerScore(p))
    .sort()
    .slice(0, 11);
};
export const postTeamMemberHistory = async (data, gameweekHistoryId, gameweekId) => {
  const players = getPlayersByGameweekId(gameweekHistoryId);
  if (players) {
    await teamMemberHistoryRepository.deleteByGameweekId(gameweekHistoryId);
  }

  const result = await teamMemberHistoryRepository.createTeamMemberHistory(
    data,
    gameweekHistoryId,
  );

  const { number: gameweekNumber } = await gameweekRepository.getById(gameweekId);
  const { number: currentGameweekNumber } = await gameweekRepository.getCurrentGameweek();

  const games = await gameRepository.getByGameweekId(gameweekNumber);
  const gameIds = games.map((el) => el.id);

  if (gameweekNumber !== currentGameweekNumber) {
    const pitchPlayers = await Promise.all(
      data
        .filter((p) => !p.is_on_bench)
        .map((p) =>
          playerMatchRepository.getByIdWithGamesConstraints(p.player_id, gameIds),
        ),
    );
    const teamCaptain = data.find((p) => p.is_captain).player_id;

    const reducer = (acc, curr) =>
      curr.player_id === teamCaptain
        ? acc + curr.player_score * 3
        : acc + curr.player_score;

    const totalTeamScore = pitchPlayers.reduce(reducer, 0);

    // update team_score in database
    await gameweekHistoryRepository.setTeamScoreById(gameweekHistoryId, totalTeamScore);
  }

  return result;
};

export const updateTeamMember = (id, data) =>
  teamMemberHistoryRepository.updateById(id, data);
