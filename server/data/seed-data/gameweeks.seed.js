import moment from 'moment';

const now = new Date();
const nowMidnight = moment(now)
  .set('hours', 0)
  .set('minutes', 0)
  .set('seconds', 0)
  .set('milliseconds', 0);

export default Array(10)
  .fill(0)
  .map((_, idx) => ({
    name: `gameweek-${idx + 1}`,
    createdAt: now,
    updatedAt: now,
    start: moment(nowMidnight)
      .add(idx, 'week')
      .add(idx && 1, 'day')
      .toDate(),
    end: moment(nowMidnight)
      .add(idx + 1, 'week')
      .add(1, 'day')
      .subtract(1, 'second')
      .toDate(),
  }));
