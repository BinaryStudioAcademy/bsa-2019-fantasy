import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';

export const getAllHistory = () => gameweekHistoryRepository.getAll();

export const getCurrentHistoryById = async (userId, gameweekId) => {
  const { id } = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);

  return {
    id,
  };
};

export const postCurrentHistoryById = async (userId, gameweekId) => {
  let history = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);
  if (!history) {
    history = await gameweekHistoryRepository.addByUserGameweekId(userId, gameweekId);
  }
  const { id } = history;
  console.log(id);
  return {
    id,
  };
};
