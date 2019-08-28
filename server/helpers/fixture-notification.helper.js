import gamesRepository from '../data/repositories/game.repository';
import footballClubRepository from '../data/repositories/football-club.repository';
import userRepository from '../data/repositories/user.repository';
import fixturesSubscribtionRepository from '../data/repositories/fixtures-subscription.repository';
import { getNotification } from './send-notification.helper';

export const getFixtureSubscriptions = async (userId, socket) => {
  const getGameInfo = (game, isFavClub) => {
    const {
      start,
      end,
      finished,
      hometeam_score: homeTeamScore,
      awayteam_score: awayTeamScore,
      hometeam_id,
      awayteam_id,
    } = game;

    return {
      start,
      end,
      finished,
      homeTeamScore,
      awayTeamScore,
      hometeam_id,
      awayteam_id,
      isFavClub,
    };
  };

  // send notification about the next game of the favorite club
  const user = await userRepository.getById(userId);
  const favClubGame = await getNotification(user.favorite_club_id);
  socket.emit('displayNotification', getGameInfo(favClubGame, true));

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
      socket.emit('displayNotification', gameDetails);
    });
  }
};
