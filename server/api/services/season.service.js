import seasonRepository from '../../data/repositories/season.repository';

export const getSeasonById = async seasonId =>
    await seasonRepository.getById(seasonId);
