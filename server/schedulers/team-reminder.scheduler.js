/* eslint-disable no-console */
import moment from 'moment';
import schedule from 'node-schedule';

import userRepository from '../data/repositories/user.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';

const teamReminderScheduler = async () => {
  const gameweeks = await gameweekRepository.getAll();
  const nextGameweek = gameweeks.find((w) => {
    const now = moment().add(5, 'h');

    return moment(now).isBefore(w.start);
  });

  const timeToRemind = moment(nextGameweek.start).subtract(5, 'h');

  if (!nextGameweek) {
    return;
  }

  schedule.scheduleJob('remind apply team', timeToRemind, async (fireDate) => {
    console.log(`remind apply team ${fireDate}`);
    const users = await userRepository.getAll();
    users.forEach(async (u) => {
      if (u.team_name === null) {
        console.log('apply team');
      }
    });
    teamReminderScheduler();
  });
  console.log(`>>> Players price recalculation job scheduled on: ${nextGameweek.start}`);
};

export default teamReminderScheduler;
