import moment from 'moment';

import GameRepository from '../data/repositories/game.repository';

export const getNotification = async (id) => {
  const games = await GameRepository.getByClubId(id);
  const nextGame = games.find((g) => {
    const now = moment().add();
    return moment(now).isBefore(g.start);
  });

  return nextGame;
};
