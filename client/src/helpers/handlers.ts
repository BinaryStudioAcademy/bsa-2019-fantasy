import { feedback } from 'react-feedbacker';
import moment from 'moment';

export default (socket) => {
  socket.on('displayNotification', (fixture) => {
    if (fixture) {
      feedback.success(
        `Your favorite club will play on ${moment(fixture.start).format(
          'dddd D MMMM YYYY HH:mm',
        )}`,
      );
    } else {
      feedback.error(`We don't find games with your favorite club`);
    }
  });
};
