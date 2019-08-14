import gameRepository from '../../data/repositories/game.repository';

export const getAllGames = () => gameRepository.getAll();

export const getGameById = (id) => gameRepository.getById(id);

export const getGameByGameweekId = (id) => gameRepository.getByGameweekId(id);

export const getFixturesForPlayer = async (playerId, clubId) => {
  return await gameRepository
    .getAllWithClubs()
    .map((el) => el.get({ plain: true }))
    .reduce(async (result, { start, hometeam, awayteam }) => {
      if (start > new Date()) {
        if (hometeam.id == clubId) {
          result.push({ start, opp: awayteam.short_name });
        }
        if (awayteam.id == clubId) {
          result.push({ start, opp: hometeam.short_name });
        }
      }
      return result;
    }, []);
};
