/* eslint-disable no-console */
import moment from 'moment';
import schedule from 'node-schedule';

import userRepository from '../data/repositories/user.repository';
import gamesRepository from '../data/repositories/game.repository';
import footballClubRepository from '../data/repositories/football-club.repository';
import fixturesSubscribtionRepository from '../data/repositories/fixtures-subscription.repository';
import { sendRemind } from '../helpers/send-fixture-details.helper';

const fixturesReminderScheduler = async () => {
  const users = await userRepository.getAll();
  const subscriptions = await fixturesSubscribtionRepository.getAll();

  users.forEach(async (u) => {
    // eslint-disable-next-line prefer-const
    const userSubscriptions = subscriptions.filter((s) => s.user_id === u.id);

    if (userSubscriptions) {
      userSubscriptions.forEach(async (us) => {
        const userToRemind = await userRepository.getById(us.user_id);
        const {
          start,
          started,
          finished,
          minutes,
          hometeam_score,
          awayteam_score,
          hometeam_id,
          awayteam_id,
        } = await gamesRepository.getById(us.game_id);

        const { name: homeTeamName } = await footballClubRepository.getById(hometeam_id);
        const { name: awayTeamName } = await footballClubRepository.getById(awayteam_id);
        const gameDetails = {
          start,
          started,
          finished,
          minutes,
          hometeam_score,
          awayteam_score,
          homeTeamName,
          awayTeamName,
        };
        const timeToRemind = moment(gameDetails.start).subtract(24, 'h');

        schedule.scheduleJob(
          'fixture remind',
          new Date(timeToRemind),
          async (fireDate) => {
            console.log(
              `remind about fixture ${gameDetails} at ${fireDate} for user ${userToRemind.email}`,
            );

            sendRemind(userToRemind.email, gameDetails);

            fixturesReminderScheduler();
          },
        );
        console.log(
          `>>> Remind about fixture ${gameDetails.homeTeamName} - ${gameDetails.awayTeamName} on: ${timeToRemind} for user ${userToRemind.email}`,
        );
      });
    }
  });
};

export default fixturesReminderScheduler;
