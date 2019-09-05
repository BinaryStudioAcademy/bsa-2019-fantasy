/* eslint-disable no-console */
import moment from 'moment';
import schedule from 'node-schedule';

import userRepository from '../data/repositories/user.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';
import { sendRemind } from '../helpers/send-email.helper';

const teamReminderScheduler = async () => {
  const gameweeks = await gameweekRepository.getAll();
  const users = await userRepository.getAll();
  users.forEach(async (u) => {
    if (u.sendmail_time && !u.team_name && u.team_email) {
      const nextGameweek = gameweeks.find((w) => {
        const now = moment().add(u.sendmail_time, 'h');

        return moment(now).isBefore(w.start);
      });
      if (!nextGameweek) {
        return;
      }
      const timeToRemind = moment(nextGameweek.start).subtract(u.sendmail_time, 'h');

      schedule.scheduleJob('remind apply team', new Date(timeToRemind), async () => {
        sendRemind(u.email);
      });
      console.log(
        `>>> Send remind-email to apply team on: ${timeToRemind} for ${u.email}`,
      );
    }
  });
};

export default teamReminderScheduler;
