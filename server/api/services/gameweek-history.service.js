import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';

export const getAllHistory = () => gameweekHistoryRepository.getAll();

export const getCurrentHistoryById = async (userId, gameweekId) => {
  const { id } = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);

  return id;
};

export const getHistoryById = async (gameweekHistoryId) => {
  const { id } = await gameweekHistoryRepository.getById(gameweekHistoryId);
  return id;
};

export const postCurrentHistoryById = async (userId, gameweekId) => {
  let history = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);
  if (!history) {
    history = await gameweekHistoryRepository.addByUserGameweekId(userId, gameweekId);
  }

  return history.id;
};

export const getHistoriesByUserId = async (userId) => {
  const histories = await gameweekHistoryRepository.getByUserId(userId);
  const now = new Date();
  const finishedHistories = histories.filter((history) => history.gameweek.start < now);

  return finishedHistories;
};

export const getHistoryByGameweekId = async (gameweekId) => {
  const result = await gameweekHistoryRepository.getByGameweekId(gameweekId);
  return result;
};
