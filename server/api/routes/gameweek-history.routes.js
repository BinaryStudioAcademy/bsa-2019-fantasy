import { Router } from 'express';

import * as gameweekHistoryService from '../services/gameweek-history.service';
import * as teamMemberHistoryService from '../services/team-member-history.service';
import * as transferService from '../services/transfer.service';
import jwtMiddleware from '../middlewares/jwt.middleware';

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
  .get('/gameweek/:gameweek', (req, res, next) =>
    gameweekHistoryService
      .getHistoryByGameweekId(req.params.gameweek)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/user-team/:user/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .getCurrentHistoryById(req.params.user, req.params.gameweek)
      .then((historyId) => {
        teamMemberHistoryService
          .getPlayersByGameweekId(historyId)
          .then((players) => {
            return res.json(players);
          })
          .catch(next);
      })
      .catch(next);
  })

  .post('/user-team/:user/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .postCurrentHistoryById(req.params.user, req.params.gameweek)
      .then((gameweekHistoryId) => {
        teamMemberHistoryService
          .postTeamMemberHistory(req.body, gameweekHistoryId)
          .then((players) => res.json(players))
          .catch(next);
      });
  })
  .get('/user-team/:user', (req, res, next) => {
    gameweekHistoryService
      .getHistoriesByUserId(req.params.user)
      .then((value) => res.json(value))
      .catch(next);
  })
  .post('/transfers/:gameweek', jwtMiddleware, (req, res, next) => {
    transferService
      .applyTransfers(req.user.id, req.params.gameweek, req.body)
      .then((amount) =>
        res.send({
          message: `Successfully transfered ${amount} player${amount > 1 ? 's' : ''}`,
        }),
      )
      .catch(next);
  });

export default router;
