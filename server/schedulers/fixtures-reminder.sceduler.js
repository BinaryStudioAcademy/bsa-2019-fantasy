/* eslint-disable no-console */
import moment from 'moment';
import schedule from 'node-schedule';

import userRepository from '../data/repositories/user.repository';
import gamesRepository from '../data/repositories/game.repository';
import footballClubRepository from '../data/repositories/football-club.repository';
import fixturesSubscribtionRepository from '../data/repositories/fixtures-subscription.repository';
import { sendRemind } from '../helpers/send-email.helper';
import { getGameInfo } from '../helpers/fixture-notification.helper';

const fixturesReminderScheduler = async () => {
  const users = await userRepository.getAll();
  const subscriptions = await fixturesSubscribtionRepository.getAll();

  users.forEach(async (u) => {
    // eslint-disable-next-line prefer-const
    const userSubscriptions = subscriptions.filter((s) => s.user_id === u.id);

    if (userSubscriptions) {
      userSubscriptions.forEach(async (us) => {
        const userToRemind = await userRepository.getById(us.user_id);

        const game = await gamesRepository.getById(us.game_id);

        const { name: homeTeamName } = await footballClubRepository.getById(
          getGameInfo(game).hometeam_id,
        );
        const { name: awayTeamName } = await footballClubRepository.getById(
          getGameInfo(game).awayteam_id,
        );
        const gameDetails = {
          ...getGameInfo(game),
          homeTeamName,
          awayTeamName,
        };

        // send user emails at different time depending on match status
        const timeToRemind = getGameInfo(game).finished
          ? moment(gameDetails.start).subtract(24, 'h')
          : moment(gameDetails.end).add(30, 'm');

        schedule.scheduleJob('fixture remind', new Date(timeToRemind), async () => {
          sendRemind(userToRemind.email, gameDetails);
          fixturesReminderScheduler();
        });
        console.log(
          `>>> Remind about fixture ${gameDetails.homeTeamName} - ${gameDetails.awayTeamName} on: ${timeToRemind} for user ${userToRemind.email}`,
        );
      });
    }
  });
};

export default fixturesReminderScheduler;
