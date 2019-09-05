import moment from 'moment';
import schedule from 'node-schedule';
import gamesRepository from '../data/repositories/game.repository';
import footballClubRepository from '../data/repositories/football-club.repository';
import userRepository from '../data/repositories/user.repository';
import gameweekRepository from '../data/repositories/gameweek.repository';
import fixturesSubscribtionRepository from '../data/repositories/fixtures-subscription.repository';
import { getNotification } from './send-notification.helper';

export const getGameInfo = (game, isFavClub) => {
  const {
    start,
    end,
    finished,
    minutes,
    hometeam_score: homeTeamScore,
    awayteam_score: awayTeamScore,
    hometeam_id,
    awayteam_id,
  } = game;

  return {
    start,
    end,
    finished,
    minutes,
    homeTeamScore,
    awayTeamScore,
    hometeam_id,
    awayteam_id,
    isFavClub,
  };
};
export const sendNotifications = async (userId, socket) => {
  const user = await userRepository.getById(userId);
  // notifications about the next game of the favorite club
  if (user.club_notif) {
    const favClubGame = await getNotification(user.favorite_club_id);

    const timeToRemind = moment(favClubGame.start).subtract(user.sendmail_time, 'h');

    schedule.scheduleJob(
      'favourite club app remind',
      new Date(timeToRemind),
      async () => {
        socket.emit('displayNotification', getGameInfo(favClubGame, true));
      },
    );

    console.log(
      `>>> Send app notification about favourite club game for ${user.email} on: ${timeToRemind}`,
    );
  }

  // notifications to apply a team
  if (user.team_notif && !user.team_name) {
    const gameweeks = await gameweekRepository.getAll();
    const nextGameweek = gameweeks.find((w) => {
      const now = moment();

      return moment(now).isBefore(w.start);
    });
    if (nextGameweek) {
      const timeToRemind = moment(nextGameweek.start).subtract(user.sendmail_time, 'h');

      schedule.scheduleJob(
        'app remind to apply a team',
        new Date(timeToRemind),
        async () => {
          socket.emit('displayNotification');
        },
      );

      console.log(
        `>>> Send app notification to apply a team for ${user.email} on: ${timeToRemind}`,
      );
    }
  }

  // notifications about subscribed fixtures
  const subscriptions = await fixturesSubscribtionRepository.getAll();
  // get subscriptions to fixtures for current user
  const userSubscriptions = subscriptions.filter((s) => s.user_id === userId);

  if (userSubscriptions) {
    userSubscriptions.forEach(async (us) => {
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

      let timeToRemind = '';
      if (game.finished) {
        timeToRemind = moment(game.end).add(1, 'h');
      } else {
        timeToRemind = moment(game.start).subtract(user.sendmail_time, 'h');
      }

      schedule.scheduleJob('fixture app remind', new Date(timeToRemind), async () => {
        socket.emit('displayNotification', gameDetails);
      });

      console.log(
        `>>> Send app notification about the fixture ${homeTeamName} - ${awayTeamName}  for ${user.email} on: ${timeToRemind}`,
      );
    });
  }
};
