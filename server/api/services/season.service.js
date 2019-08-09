import seasonRepository from '../../data/repositories/season.repository';

export const getSeasonById = async seasonId => {
    const season = await seasonRepository.getById(seasonId);
    return season;
};
