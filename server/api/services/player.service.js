import playerRepository from '../../data/repositories/player.repository';

export const getPlayers = async () => {
    const players = await playerRepository.getAll();
    return players;
};

export const getPlayerById = async playerId => {
    const player = await playerRepository.getById(playerId);
    return player;
};
