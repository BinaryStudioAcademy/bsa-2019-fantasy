import gameweekRepository from '../../data/repositories/gameweek.repository';

export const getGameweeks = async () => {
    const gameweek = await gameweekRepository.getAll();
    return gameweek;
};

export const getGameweekById = async gameweekId => {
    const gameweek = await gameweekRepository.getById(gameweekId);
    return gameweek;
};
