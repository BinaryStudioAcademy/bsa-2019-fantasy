import footballClubRepository from '../../data/repositories/football-club.repository';

export const getAllFootballClubs = async () => {
  const result = await footballClubRepository.getAll();
  return result;
};

export const getFootballClubById = async (id) => {
  const {
    name,
    short_name,
    played,
    win,
    loss,
    code,
  } = await footballClubRepository.getById(id);
  return { name, short_name, played, win, loss, code };
};
