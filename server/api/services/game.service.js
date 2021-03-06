import gameRepository from '../../data/repositories/game.repository';
import gameWeekRepository from '../../data/repositories/gameweek.repository';

export const getAllGames = () => gameRepository.getAll();

export const getPlayedGames = (query) => gameRepository.getPlayedGames(query);

export const getGameById = (id) => gameRepository.getById(id);

export const getGameByGameweekId = (id) => gameRepository.getByGameweekId(id);

/**
 * @param {string} playerId Why do we even need it here?
 */
export const getFixturesForPlayer = async (playerId, clubId) => {
  function formatDate(date) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}`;
  }

  return gameRepository
    .getAllWithClubs()
    .map((el) => el.get({ plain: true }))
    .reduce(async (result, { start, hometeam, awayteam, gameweek_id }, i) => {
      if (start > new Date()) {
        if (hometeam.id.toString() === clubId) {
          result.push({
            start: formatDate(start),
            opp: awayteam.short_name,
            round: gameweek_id,
          });
        }
        if (awayteam.id.toString() === clubId) {
          result.push({
            start: formatDate(start),
            opp: hometeam.short_name,
            round: gameweek_id,
          });
        }
      }
      return result;
    }, []);
};

export const getCurrentGame = async () => {
  const currentPromise = gameRepository.getCurrent();
  const nextPromise = gameRepository.getNext();
  const [current, next] = [await currentPromise, await nextPromise];

  return { current, next };
};
