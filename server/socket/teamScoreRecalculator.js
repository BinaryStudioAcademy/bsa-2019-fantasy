/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import gameweekHistoryRepository from '../data/repositories/gameweek-history.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';
import playerMatchRepository from '../data/repositories/player-match.repository';
import gameRepository from '../data/repositories/game.repository';

const recalculateTeamsScore = async () => {
  try {
    const currentGameweek = await gameweekRepository.getCurrent();
    if (!currentGameweek) return;

    const { number: gameweekNumber } = await gameweekRepository.getById(
      currentGameweek.id,
    );
    const games = await gameRepository.getByGameweekId(gameweekNumber);
    const gameIds = games.map((el) => el.id);

    const gameweekHistories = await gameweekHistoryRepository.getByGameweekId(
      currentGameweek.id,
    );

    for (let i = 0; i < gameweekHistories.length; i += 1) {
      const historyId = gameweekHistories[i].id;
      const teamHistory = gameweekHistories[i].team_member_histories;
      const pitchPlayersRaw = await Promise.all(
        teamHistory
          .filter((p) => !p.is_on_bench)
          .map((p) =>
            playerMatchRepository.getByIdWithGamesConstraints(p.player_id, gameIds),
          ),
      );

      const teamCaptain = teamHistory.find((p) => p.is_captain).player_id;
      const pitchPlayers = pitchPlayersRaw.filter((p) => p !== null);

      const reducer = (acc, curr) =>
        curr.player_id === teamCaptain
          ? acc + curr.player_score * 3
          : acc + curr.player_score;

      const totalTeamScore = pitchPlayers.reduce(reducer, 0);

      // update team_score in database
      await gameweekHistoryRepository.setTeamScoreById(historyId, totalTeamScore);
    }
  } catch (err) {
    throw err;
  }
};

export default recalculateTeamsScore;
