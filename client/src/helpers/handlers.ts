import store from 'store/index';

import moment from 'moment';

import { feedback } from 'react-feedbacker';
import { FixtureSubType } from 'types/fixtures.types';
import { setLiveStatus, addLiveEvent } from 'containers/Live/actions';
import { addNotification } from 'components/Notifications/actions';

export default (socket) => {
  socket.on('displayNotification', (fixture: FixtureSubType) => {
    if (!fixture) {
      feedback.success(
        `Seems like you forgot to apply a team. Hurry up, the gameweek starts soon!`,
      );
      store.dispatch(
        addNotification(
          `Seems like you forgot to apply a team. Hurry up, the gameweek starts soon!`,
        ),
      );
    }
    if (fixture.isFavClub) {
      feedback.success(
        `Your favorite club will play on
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
      );
      store.dispatch(
        addNotification(`Your favorite club will play on
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`),
      );
    } else {
      if (fixture.finished) {
        feedback.success(
          `Fixture ${fixture.homeTeamName} - ${fixture.awayTeamName} finished on 
         ${moment(fixture.end).format('dddd D MMMM YYYY HH:mm')} with results ${
            fixture.homeTeamScore
          } - ${fixture.awayTeamScore}`,
        );
        store.dispatch(
          addNotification(`Fixture ${fixture.homeTeamName} - ${
            fixture.awayTeamName
          } finished on 
         ${moment(fixture.end).format('dddd D MMMM YYYY HH:mm')} with results ${
            fixture.homeTeamScore
          } - ${fixture.awayTeamScore}`),
        );
      } else {
        feedback.success(
          `${fixture.homeTeamName} - ${fixture.awayTeamName} will play on
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
        );

        store.dispatch(
          addNotification(`${fixture.homeTeamName} - ${fixture.awayTeamName} will play on
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`),
        );
      }
    }
  });

  socket.on('status', (status) => {
    store.dispatch(setLiveStatus(status));
  });
  socket.on('event', (data) => {
    store.dispatch(addLiveEvent(data));
  });
};
