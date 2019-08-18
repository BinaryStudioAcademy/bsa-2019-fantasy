import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';

export const getAllHistory = () => gameweekHistoryRepository.getAll();

export const getCurrentHistoryById = async (userId, gameweekId) => {
  const { id } = await gameweekHistoryRepository.getByUserGameweekId(userId, gameweekId);
  return {
    id,
  };
};

export const getHistoriesByUserId = async userId => {
  const histories = await gameweekHistoryRepository.getByUserId(userId);
  
  const now = new Date();
  const finishedHistories = histories.filter(history => history.gameweek.start < now);

  return finishedHistories;
}
