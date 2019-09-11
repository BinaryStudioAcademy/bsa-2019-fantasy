import i18n from 'i18n';

export const createComment = (event, { homeClub, awayClub, score }) => {
  const [home, away] = score;
  const { player, team } = event;
  const name = player ? `${player.first_name} ${player.second_name}` : '';
  const club = team ? (team === 'home' ? homeClub : awayClub) : undefined;

  switch (event.name) {
    case 'startGame':
      return i18n.t('Commentary.startGame', {
        homeClubName: homeClub.name,
        awayClubName: awayClub.name,
      });
    case 'endGame':
      return i18n.t('Commentary.endGame', {
        homeClubName: homeClub.name,
        awayClubName: awayClub.name,
        home,
        away,
      });
    case 'startTime':
      return i18n.t('Commentary.startTime');
    case 'endTime':
      return i18n.t('Commentary.endTime', { home, away });
    case 'attack':
      return i18n.t('Commentary.attack', { name, clubName: club.name });
    case 'shot':
      return i18n.t('Commentary.shot', { name });
    case 'foul':
      return i18n.t('Commentary.foul', { name });
    case 'goal':
      return i18n.t('Commentary.goal', { name, clubName: club.name, home, away });
    case 'save':
      return i18n.t('Commentary.save', { name });
    case 'miss':
      return i18n.t('Commentary.miss');
    case 'yellowCard':
      return i18n.t('Commentary.yellowCard', { name });
    case 'goalKick':
      return i18n.t('Commentary.goalKick', { clubName: club.name });
    case 'cornerKick':
      return i18n.t('Commentary.cornerKick', { name });
    case 'freeKick':
      return i18n.t('Commentary.freeKick', { name });
    case 'penaltyKick':
      return i18n.t('Commentary.penaltyKick', { name });
    case 'interception':
      return i18n.t('Commentary.interception', { name });
    case 'out':
      return i18n.t('Commentary.out', { clubName: club.name });
    case 'trauma':
      return i18n.t('Commentary.trauma', { name, clubName: club.name });
    case 'nothing':
    case 'stop':
      return null;
    default:
      return `${event.text}`;
  }
};
