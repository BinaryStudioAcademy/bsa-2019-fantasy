import { feedback } from 'react-feedbacker';
import moment from 'moment';

export default (socket) => {
  socket.on('notification', (fix) => {
    if (fix && fix.length) {
      feedback.success(
        `Your favorite club will be play on ${moment(fix.start).format(
          'dddd D MMMM YYYY',
        )}`,
      );
    } else {
      feedback.error(`We don't find games with your favorite club`);
    }
  });
};
