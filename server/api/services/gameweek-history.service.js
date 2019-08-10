import gameweekHistoryRepository from "../../data/repositories/gameweek-history.repository";

export const getAllHistory = async () =>
    await gameweekHistoryRepository.getAll();

export const getHistoryById = async id =>
    await gameweekHistoryRepository.getById(id);
