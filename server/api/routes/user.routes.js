import { Router } from 'express';
import * as userService from '../services/user.service';
import * as gameweekHistoryService from '../services/gameweek-history.service';

const router = Router();

router
  .get('/:id', (req, res, next) =>
    userService
      .getUserById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:userId/gameweek-history/:gameweekId', (req, res, next) => {
    const { userId, gameweekId } = req.params;
    gameweekHistoryService
      .getCurrentHistoryById(userId, gameweekId)
      .then((value) => console.log(value));
  });

export default router;
