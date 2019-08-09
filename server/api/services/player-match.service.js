import PlayerMatchRepository from "../../data/repositories/player-match.repository";

export const getAllPlayerMatch = async () =>
    await PlayerMatchRepository.getAll();

export const getPlayerMatchById = async id =>
    await PlayerMatchRepository.getById(id);
