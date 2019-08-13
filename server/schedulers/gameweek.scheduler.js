import moment from 'moment';
import schedule from 'node-schedule';

import playerRepository from '../data/repositories/player.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';
import calculatePlayerPrice from '../helpers/calculate-player-price.helper';

let isFirstLaunch = true;

const gameweekScheduler = async () => {
  const gameweeks = await gameweekRepository.getAll();
  const currentGameweek = gameweeks.find((w) => {
    const now = moment().add(2, 's');
    return moment(w.start).isBefore(now) && moment(w.end).isAfter(now);
  });

  if (!isFirstLaunch) {
    const players = await playerRepository.getAll();
    players.forEach(async (p) => {
      const newPrice = calculatePlayerPrice(p.player_score, p.player_price);

      if (p.player_price !== newPrice) {
        playerRepository.updateById(p.id, {
          player_price: newPrice,
        });
      }
    });
  } else {
    isFirstLaunch = false;
  }

  schedule.scheduleJob('players-price-recalculation', currentGameweek.end, (fireDate) => {
    console.log(`>>> Players price recalculation! ${fireDate}`);
    gameweekScheduler();
  });
  console.log(`>>> Players price recalculation job scheduled on: ${currentGameweek.end}`);

  // TEST@FIXME: Test schedule with following:
  // const now = new Date();
  // console.log(now);
  // now.setMinutes(now.getMinutes() + 1);
  // schedule.scheduleJob('players-price-recalculation-test', now, (fireDate) => {
  //   console.log(`>>> [TEST] Players price recalculation! ${fireDate}`);
  //   gameweekScheduler();
  // });
  // console.log(`>>> Players price recalculation job scheduled on: ${now}`);
};

export default gameweekScheduler;
