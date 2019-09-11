import store from 'store/index';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { feedback } from 'react-feedbacker';
import { FixtureSubType } from 'types/fixtures.types';
import { setLiveStatus, addLiveEvent } from 'containers/Live/actions';
import { addNotification } from 'components/Notifications/actions';

const { t } = useTranslation();
export default (socket) => {
  socket.on('displayNotification', (fixture: FixtureSubType) => {
    if (!fixture) {
      feedback.success(t('feedback.forgotApply'));
      store.dispatch(addNotification(t('feedback.forgotApply')));
    }
    if (fixture.isFavClub) {
      feedback.success(
        `${t('feedback.clubPlayInfo')}
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
      );
      store.dispatch(
        addNotification(`${t('feedback.clubPlayInfo')}
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`),
      );
    } else {
      if (fixture.finished) {
        feedback.success(
          `${t('feedback.fixture')} ${fixture.homeTeamName} - ${fixture.awayTeamName} ${t(
            'feedback.finishedOn',
          )}
         ${moment(fixture.end).format('dddd D MMMM YYYY HH:mm')} ${t(
            'feedback.withResults',
          )} ${fixture.homeTeamScore} - ${fixture.awayTeamScore}`,
        );
        store.dispatch(
          addNotification(
            `${t('feedback.fixture')} ${fixture.homeTeamName} - ${
              fixture.awayTeamName
            } ${t('feedback.finishedOn')} ${moment(fixture.end).format(
              'dddd D MMMM YYYY HH:mm',
            )} ${t('feedback.withResults')}  ${fixture.homeTeamScore} - ${
              fixture.awayTeamScore
            }`,
          ),
        );
      } else {
        feedback.success(
          `${fixture.homeTeamName} - ${fixture.awayTeamName} ${t('feedback.willPlayOn')}
         ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
        );

        store.dispatch(
          addNotification(`${fixture.homeTeamName} - ${fixture.awayTeamName} ${t(
            'feedback.willPlayOn',
          )}
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
