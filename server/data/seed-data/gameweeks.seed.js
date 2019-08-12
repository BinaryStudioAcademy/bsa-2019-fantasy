import moment from 'moment';

const now = new Date();

export default [
  {
    name: 'name1',
  },
  {
    name: 'name2',
  },
  {
    name: 'name3',
  },
].map((gameweek, idx) => ({
  ...gameweek,
  createdAt: now,
  updatedAt: now,
  start: moment(now)
    .add(idx, 'week')
    .add(idx && 1, 'day')
    .toDate(),
  end: moment(now)
    .add(idx + 1, 'week')
    .toDate(),
}));
