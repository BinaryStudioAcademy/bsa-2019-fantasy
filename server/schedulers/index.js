import gameweekScheduler from './gameweek.scheduler';
import teamReminderScheduler from './team-reminder.scheduler';

const initSchedulers = () => {
  gameweekScheduler();
  teamReminderScheduler();
};

export default initSchedulers;
