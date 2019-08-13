import gameRepository from '../../data/repositories/game.repository';

export const getAllGames = () => gameRepository.getAll();

export const getGameById = (id) => gameRepository.getById(id);

export const getGameByGameweekId = (id) => gameRepository.getByGameweekId(id);
