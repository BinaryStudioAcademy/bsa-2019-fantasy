import teamMemberHistoryRepository from '../../data/repositories/team-member-history.repository';
import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';
import playerMatchRepository from '../../data/repositories/player-match.repository';
import gameweekRepository from '../../data/repositories/gameweek.repository';
import gameRepository from '../../data/repositories/game.repository';
import * as gameweekHistoryService from './gameweek-history.service';
import * as userService from './user.service';
import * as gameweekService from './gameweek.service';

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
        const playerStats = await playerMatchRepository.getByIdWithGamesConstraints(
          item.player_id,
          gameIds,
        );
        let player_score = 0;
        if (playerStats) {
          // eslint-disable-next-line prefer-destructuring
          player_score = playerStats.player_score;
        }
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
  try {
    const players = getPlayersByGameweekId(gameweekHistoryId);
    if (players) {
      await teamMemberHistoryRepository.deleteByGameweekId(gameweekHistoryId);
    }

    const result = await teamMemberHistoryRepository.createTeamMemberHistory(
      data,
      gameweekHistoryId,
    );

    const { number: gameweekNumber } = await gameweekRepository.getById(gameweekId);
    const { current, next } = await gameweekService.getCurrentGameweek();

    const mostRecentGameweek = current || next;

    const games = await gameRepository.getByGameweekId(gameweekNumber);
    const gameIds = games.map((el) => el.id);

    if (gameweekNumber !== mostRecentGameweek.number) {
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

      const { user_id } = await gameweekHistoryRepository.getById(gameweekHistoryId);

      // update user_score in database
      gameweekHistoryService.getHistoriesByUserId(user_id).then((histories) => {
        const totalUserScore = histories.reduce((acc, item) => acc + item.team_score, 0);
        userService.updateById(user_id, { score: totalUserScore });
      });
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export const updateTeamMember = (id, data) =>
  teamMemberHistoryRepository.updateById(id, data);
