import gameweekRepository from '../../data/repositories/gameweek.repository';

export const getGameweeks = async () => await gameweekRepository.getAll();

export const getGameweekById = async gameweekId =>
    await gameweekRepository.getById(gameweekId);
