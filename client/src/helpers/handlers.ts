import { feedback } from 'react-feedbacker';
import moment from 'moment';

export default (socket) => {
  socket.on('displayNotification', (fixtures) => {
    if (fixtures && fixtures.length) {
      fixtures.map((fix) => {
        feedback.success(
          `Your favorite club will play on ${moment(fix.start).format(
            'dddd D MMMM YYYY HH:mm',
          )}`,
        );
      });
    } else {
      feedback.error(`We don't find games with your favorite club`);
    }
  });
};
