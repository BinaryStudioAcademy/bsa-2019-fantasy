import moment from 'moment';
// eslint-disable-next-line import/no-named-as-default
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

  return result;
};

export const getGameweekById = async (gameweekId) => {
  const result = await gameweekRepository.getById(gameweekId);
  return result;
};

export const getCurrentGameweek = async () => {
  const current = await gameweekRepository.getCurrent();
  const next = await gameweekRepository.getNext();
  return { current, next };
};
