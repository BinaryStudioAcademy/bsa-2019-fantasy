import FootballClubRepository from "../../data/repositories/football-club.repository";

export const getAllFootballClubs = async () =>
    await FootballClubRepository.getAll();

export const getFootballClubById = async id =>
    await FootballClubRepository.FootballClubs(id);
