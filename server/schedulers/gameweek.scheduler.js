/* eslint-disable no-console */
import moment from 'moment';
import schedule from 'node-schedule';

import playerRepository from '../data/repositories/player.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';
import calculatePlayerPrice from '../helpers/calculate-player-price.helper';
import userRepository from '../data/repositories/user.repository';

const gameweekScheduler = async () => {
  const gameweeks = await gameweekRepository.getAll();
  const currentGameweek = gameweeks
    .sort((a, b) => new Date(a.end) - new Date(b.end))
    .find((gw) => {
      const now = moment();
      return moment(gw.end).isAfter(now);
    });

  if (!currentGameweek) {
    return;
  }

  schedule.scheduleJob(
    'players-price-recalculation',
    currentGameweek.end,
    async (fireDate) => {
      console.log(`>>> End of gameweek! ${fireDate}`);

      // Recalculate players' prices
      const players = await playerRepository.getAll();
      players.forEach(async (p) => {
        const newPrice = calculatePlayerPrice(p.player_score, p.player_price);

        if (p.player_price !== newPrice) {
          playerRepository.updateById(p.id, {
            player_price: newPrice,
          });
        }
      });

      // Add a free transfer to each user
      const users = await userRepository.getAll();
      users.forEach(async (u) => {
        if (u.free_transfers < 2) {
          userRepository.updateById(u.id, {
            free_transfers: u.free_transfers + 1,
          });
        }
      });

      gameweekScheduler();
    },
  );
  console.log(`>>> Players price recalculation job scheduled on: ${currentGameweek.end}`);
  console.log(`>>> Users free transfer giving job scheduled on: ${currentGameweek.end}`);
};

export default gameweekScheduler;
