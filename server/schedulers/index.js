import gameweekScheduler from './gameweek.scheduler';
import teamReminderScheduler from './team-reminder.scheduler';
import fixturesReminderScheduler from './fixtures-reminder.sceduler';

const initSchedulers = () => {
  gameweekScheduler();
  teamReminderScheduler();
  fixturesReminderScheduler();
};

export default initSchedulers;
