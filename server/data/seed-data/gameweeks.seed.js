import moment from 'moment';

import fixtures from './json/fixtures.json';

let prevEvent = 1;
let acc = [];
let acc2 = [];
fixtures.forEach((item) => {
  if (item.event > prevEvent) {
    acc = [...acc, acc2];
    acc2 = [];
    prevEvent = item.event;
  }
  acc2.push(item);
});

acc = [...acc, acc2];
const now = new Date();

const gameweeks = acc.map((item) => {
  const lastIndex = item.length - 1;
  return {
    number: item[0].event,
    name: `Gameweek ${item[0].event}`,
    start: moment(item[0].kickoff_time).toDate(),
    end: moment(item[lastIndex].kickoff_time)
      .add(90, 'minutes')
      .toDate(),
    createdAt: now,
    updatedAt: now,
  };
});

export default gameweeks;
