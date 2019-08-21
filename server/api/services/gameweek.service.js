import gameweekRepository from '../../data/repositories/gameweek.repository';

export const getGameweeks = () => gameweekRepository.getAll();
export const getGameweekById = (gameweekId) => gameweekRepository.getById(gameweekId);

export const getCurrentGameweek = async () => {
  const current = await gameweekRepository.getCurrent();
  const next = await gameweekRepository.getNext();
  return { current, next };
};
