import gameRepository from "../../data/repositories/game.repository";

export const getAllGames = async () => await gameRepository.getAll();

export const getGameById = async id => await gameRepository.getById(id);
