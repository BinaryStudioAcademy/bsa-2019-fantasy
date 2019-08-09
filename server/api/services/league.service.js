import leagueRepository from "../../data/repositories/league.repository";

export const getAllLeagues = async () => await leagueRepository.getAll();

export const getLeagueById = async id => await leagueRepository.getById(id);

export const createLeague = (id, data) =>
    leagueRepository.create({
        ...data,
        id
    });

export const updateLeague = async (id, data) =>
    leagueRepository.updateById(id, data);

export const deleteLeagueById = async id => leagueRepository.deleteById(id);
