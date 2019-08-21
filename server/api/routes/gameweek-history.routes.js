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
  .get('/gameweek/:gameweek', (req, res, next) =>
    gameweekHistoryService
      .getHistoryByGameweekId(req.params.gameweek)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/gameweek/results/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .getHistoryByGameweekId(req.params.gameweek)
      .then((value) => {
        return res.json({
          averageScore: gameweekHistoryService.getAverageGameweekScore(value),
          maxScore: gameweekHistoryService.getMaxGameweekScore(value),
        });
      })
      .catch(next);
  })
  .get('/gameweek/best-players/:gameweek', (req, res, next) => {
    gameweekHistoryService
      .getHistoryByGameweekId(req.params.gameweek)
      .then((history) => {
        teamMemberHistoryService
          .getPlayersByGameweekId(history)
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
  });

export default router;
