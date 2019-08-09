import playerMatchRepository from "../../data/repositories/player-match.repository";

export const getAllPlayerMatch = async () =>
    await playerMatchRepository.getAll();

export const getPlayerMatchById = async id =>
    await playerMatchRepository.getById(id);
