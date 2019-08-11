import playerRepository from '../../data/repositories/player.repository';

export const getPlayers = async filter => await playerRepository.getFilteredPlayers(filter);

export const getPlayerById = async playerId =>
    await playerRepository.getById(playerId);
