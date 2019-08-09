import footballClubRepository from "../../data/repositories/football-club.repository";

export const getAllFootballClubs = async () =>
    await footballClubRepository.getAll();

export const getFootballClubById = async id =>
    await footballClubRepository.getById(id);
