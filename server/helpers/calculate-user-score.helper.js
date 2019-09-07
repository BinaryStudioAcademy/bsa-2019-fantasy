import * as gameweekHistoryService from '../api/services/gameweek-history.service';
import * as userService from '../api/services/user.service';

export default () => {
  userService
    .getAllUsers()
    .then((users) => {
      users.forEach((user) => {
        gameweekHistoryService.getHistoriesByUserId(user.id).then((histories) => {
          const totalScore = histories.reduce((acc, item) => acc + item.team_score, 0);
          console.log(`Recalculated user score ${user.name}: ${totalScore}`);
          return userService.updateById(user.id, { score: totalScore });
        });
      });
    })
    .catch((err) => {
      console.log('Cannot recalculate user score.');
      console.log(err);
    });
};
