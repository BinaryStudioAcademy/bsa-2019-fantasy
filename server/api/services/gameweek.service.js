import moment from 'moment';
import gameweekRepository from '../../data/repositories/gameweek.repository';

export const getGameweeks = async () => {
  const result = await gameweekRepository.getAll();
  return result;
};
export const getRecentGameweeks = async () => {
  const now = moment();

  const getGameweeksData = (gameweek) => {
    const { id, name, number, start, end, createdAt, updatedAt, season_id } = gameweek;
    return { id, name, number, start, end, createdAt, updatedAt, season_id };
  };
  const gameweeks = await gameweekRepository.getAll();

  const result = gameweeks
    .map((g) => getGameweeksData(g))
    .filter((g) => moment(g.start).isSameOrBefore(now));

  return [
    ...result,
    gameweeks
      .map((g) => getGameweeksData(g))
      .find((g) => moment(g.start).isSameOrAfter(now) && moment(g.end).isAfter(now)),
  ];
};

export const getGameweekById = async (gameweekId) => {
  const result = await gameweekRepository.getById(gameweekId);
  return result;
};
