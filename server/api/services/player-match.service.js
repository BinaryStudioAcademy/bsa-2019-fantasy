import playerMatchRepository from '../../data/repositories/player-match.repository';
import gameweekRepository from '../../data/repositories/gameweek.repository';
import gameRepository from '../../data/repositories/game.repository';
import eventRepository from '../../data/repositories/event.repository';

export const getAllPlayerMatch = async () => await playerMatchRepository.getAll();

export const getPlayerMatchById = async (id) => await playerMatchRepository.getById(id);

export const getPlayerStatsByGameweeks = async (playerId, playerClubId) => {
  const result = [];

  const gameweeks = await gameweekRepository
    .getAll()
    .map((el) => el.get({ plain: true }));

  gameweeks.map(async ({ id: gameweekId, name, number }) => {
    const games = await gameRepository
      .getByGameweekId(number)
      .map((el) => el.get({ plain: true }));

    games.map(async ({ id: gameId, start, hometeam, awayteam, hometeam_score, awayteam_score, finished }) => {
      if (!gameId || !finished) return;

      const opponent = hometeam.id !== playerClubId ? hometeam : awayteam;
      const eventsForGame = await eventRepository
        .getByGameId(gameId)
        .map((el) => el.get({ plain: true }));
      const realEvents = eventsForGame.filter((ev) => ev !== undefined);

      const eventsForCurrentPlayer = realEvents.filter(
        (event) => event.player.player_id === playerId,
      );
      if (eventsForCurrentPlayer.length < 1) return;
      const stat = eventsForCurrentPlayer[0].player; //last event for game and get this stats

      result.push({
        gameweek: { number },
        game: {
          opp: opponent.short_name,
          res: `${hometeam_score} - ${awayteam_score}`,
        },
        stats: stat,
      });
    });
  });

  return result;
};
