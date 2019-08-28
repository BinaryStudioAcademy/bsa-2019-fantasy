import moment from 'moment';
import { feedback } from 'react-feedbacker';
import { FixtureSubType } from 'types/fixtures.types';

export default (socket) => {
  socket.on('displayNotification', (fixture: FixtureSubType) => {
    if (fixture) {
      if (fixture.isFavClub) {
        feedback.success(
          `Your favorite club will play on
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
        );
      } else {
        fixture.finished
          ? feedback.success(
              `Fixture ${fixture.homeTeamName} - ${fixture.awayTeamName} finished on 
         ${moment(fixture.end).format('dddd D MMMM YYYY HH:mm')} with results ${
                fixture.homeTeamScore
              } - ${fixture.awayTeamScore}`,
            )
          : feedback.success(
              `${fixture.homeTeamName} - ${fixture.awayTeamName} will play on
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
            );
      }
    }
  });
};
