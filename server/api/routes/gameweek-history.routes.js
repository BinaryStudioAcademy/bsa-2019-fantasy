import { Router } from 'express';

import * as gameweekHistoryService from '../services/gameweek-history.service';
import * as teamMemberHistoryService from '../services/team-member-history.service';
import * as gameweekService from '../services/gameweek.service';
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
  .get('/gameweek/ranking/user/:user/:gameweek', (req, res, next) =>
    gameweekHistoryService
      .getGameweekHistoryForGameweek(req.params.gameweek)
      .then((userHistory) => {
        res.json({
          rank: gameweekHistoryService.getUserRanking(userHistory, req.params.user),
        });
      })
      .catch(next),
  )
  .get('/gameweek/recent/results', (req, res, next) => {
    gameweekService
      .getRecentGameweeks()
      .then((gameweeks) =>
        gameweekHistoryService
          .getHistoryByGameweeks(gameweeks)
          .then((histories) =>
            res.json(gameweekHistoryService.getGameweeksStatistics(histories)),
          ),
      )
      .catch(next);
  })
  .get('/gameweek/best-players/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .getHistoryByGameweekId(req.params.gameweek)
      .then((history) => {
        teamMemberHistoryService
          .getPlayersByGameweekIds(history)
          .then((players) => {
            return res.json(gameweekHistoryService.getBestPlayersOfTheGameweek(players));
          })
          .catch(next);
      })
      .catch(next);
  })
  .get('/user-team/:user/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .getCurrentHistoryById(req.params.user, req.params.gameweek)
      // eslint-disable-next-line consistent-return
      .then((history) => {
        if (history.message) {
          return res.json(history);
        }
        teamMemberHistoryService
          .getPlayersByGameweekId(history)
          .then((players) => {
            return players ? res.json(players) : res.json({ message: 'No team found' });
          })
          .catch(next);
      })
      .catch(next);
  })

  .get('/history-team/:user/:gameweek/:gameweekNumber', (req, res, next) => {
    gameweekHistoryService
      .getCurrentHistoryById(req.params.user, req.params.gameweek)
      .then((historyId) => {
        teamMemberHistoryService
          .getPlayerHistoryByGameweekId(historyId, req.params.gameweekNumber)
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
  })
  // For test purpose. Should be deleted
  .put('/auto-substitution/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .makeAutoSubstitution(req.params.gameweek)
      .then(() =>
        res.send({
          message: 'Success test',
        }),
      )
      .catch(next);
  })
  // For test purpose. Should be deleted
  .put('/auto-team-creation/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .createGameWeekHistoriesForAllUsers(req.params.gameweek)
      .then(() =>
        res.send({
          message: 'Success test',
        }),
      )
      .catch(next);
  });

export default router;
