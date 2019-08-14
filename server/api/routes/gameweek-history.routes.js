import { Router } from 'express';
import * as gameweekHistoryService from '../services/gameweek-history.service';
import * as teamMemberHistoryService from '../services/team-member-history.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    gameweekHistoryService
      .getAllHistory()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:id', (req, res, next) =>
    gameweekHistoryService
      .getHistoryById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/user-team/:id', (req, res, next) => {
    gameweekHistoryService
      .getCurrentHistoryById(req.user.id, req.params.id)
      .then((value) => {
        teamMemberHistoryService
          .getPlayersByGameweekId(value.id)
          .then((players) => {
            return res.json(players);
          })
          .catch(next);
      })
      .catch(next);
  });

export default router;
