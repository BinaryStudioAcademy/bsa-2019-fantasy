import playerRepository from '../../data/repositories/player.repository';

export const getPlayers = async () => await playerRepository.getAll();

export const getPlayerById = async playerId =>
    await playerRepository.getById(playerId);
