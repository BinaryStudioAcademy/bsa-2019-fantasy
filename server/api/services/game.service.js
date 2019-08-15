import gameRepository from '../../data/repositories/game.repository';

export const getAllGames = () => gameRepository.getAll();

export const getGameById = (id) => gameRepository.getById(id);

export const getGameByGameweekId = (id) => gameRepository.getByGameweekId(id);

export const getFixturesForPlayer = async (playerId, clubId) => {
  function formatDate(date) {
    const  monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes
  
    return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}`;
  }

  return await gameRepository
    .getAllWithClubs()
    .map((el) => el.get({ plain: true }))
    .reduce(async (result, { start, hometeam, awayteam }, i) => {
      if (start > new Date()) {
        if (hometeam.id == clubId) {
          result.push({ start: formatDate(start), opp: awayteam.short_name, round: i });
        }
        if (awayteam.id == clubId) {
          result.push({ start: formatDate(start), opp: hometeam.short_name, round: i });
        }
      }
      return result;
    }, []);
};
