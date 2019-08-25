import { Router } from 'express';
import * as leagueService from '../services/league.service';
import * as leagueParticipantService from '../services/league-participant.service';
import * as gameweekService from '../services/gameweek.service';
import * as gameweekHistoryService from '../services/gameweek-history.service';

import {
  createLeagueMiddleware,
  joinPrivateLeagueMiddleware,
  joinPublicLeagueMiddleware,
  getInvitationMiddleware,
} from '../middlewares/league.middleware';
import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .get('/', (req, res, next) =>
    leagueService
      .getPublicLeagues()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:name', jwtMiddleware, async (req, res, next) => {
    try {
      const league = await leagueService.getLeagueParams(req.params.name);
      const { id, name, start_from } = league;
      const startScoringGameweek = await gameweekService.getGameweekById(start_from);
      const result = [];

      const users = await leagueParticipantService.getLeagueParticipants(id);
      const admin_entry = users.some(
        (item) => item.user.id === req.user.id && item.is_creator,
      );

      await Promise.all(
        users.map(async (item) => {
          let gameweek_points = 0;
          let total_points = 0;
          const userGamaweekStats = await gameweekHistoryService.getHistoriesByUserId(
            item.user.id,
          );
          userGamaweekStats.map((data) => {
            if (startScoringGameweek.number <= data.gameweek.number) {
              gameweek_points = data.team_score;
              total_points += gameweek_points;
            }
          });
          result.push({ ...item, gameweek_points, total_points });
        }),
      );
      res.json({ name, private: league.private, admin_entry, participants: result });
    } catch (err) {
      next(err);
    }
  })
  .post('/', jwtMiddleware, createLeagueMiddleware, (req, res, next) =>
    leagueService
      .createLeague(req.body)
      .then((value) =>
        leagueService
          .joinLeagueById(req.user.id, value.id, true)
          .then(() =>
            res.json({
              message: `Successfully created a league with '${value.name}' name`,
            }),
          )
          .catch(next),
      )
      .catch(next),
  )
  .post(
    '/join/private',
    jwtMiddleware,
    joinPrivateLeagueMiddleware,
    async (req, res, next) => {
      try {
        const result = await leagueParticipantService.checkIfAParticipantById(
          req.user.id,
          req.body.code,
        );
        if (result.length) {
          res.status(400).json({ message: 'You have already joined this league' });
        } else {
          await leagueService.joinLeagueById(req.user.id, req.body.code, false);
          res.json({ message: 'Successfully joined a league' });
        }
      } catch (err) {
        next(err);
      }
    },
  )
  .post(
    '/join/public',
    jwtMiddleware,
    joinPublicLeagueMiddleware,
    async (req, res, next) => {
      try {
        const result = await leagueParticipantService.checkIfAParticipantByName(
          req.user.id,
          req.body.code,
        );
        if (result.length) {
          res.status(400).json({ message: 'You have already joined this league' });
        } else {
          await leagueService.joinLeagueByName(req.user.id, req.body.code, false);
          res.json({ message: 'Successfully joined a league' });
        }
      } catch (err) {
        next(err);
      }
    },
  )
  .post('/search/public', (req, res, next) => {
    leagueService
      .searchLeaguesByName(req.body.filter)
      .then((value) => res.json(value))
      .catch(next);
  })
  .post('/invitation-code', jwtMiddleware, getInvitationMiddleware, (req, res, next) => {
    leagueService
      .getLeagueParams(req.body.name)
      .then((value) => res.json({ code: value.id }))
      .catch(next);
  });

/* eslint-disable */
// router.use(function(err, req, res, next) {
//   console.log(req.body);
//   res.status(500).json({ message: err });
// });
/* eslint-enable */

export default router;
