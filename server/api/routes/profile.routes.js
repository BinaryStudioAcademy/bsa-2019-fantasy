import { Router } from 'express';
import * as userService from '../services/user.service';
import * as leagueService from '../services/league.service';
import * as leagueParticipantService from '../services/league-participant.service';
import * as footballClubService from '../services/football-club.service';
import * as gameweekService from '../services/gameweek.service.js';  
import * as gameweekHistoryService from '../services/gameweek-history.service';
import * as teamMemberHistoryService from '../services/team-member-history.service';
import * as fixturesSubscriptionService from '../services/fixtures-subscription.service';
import globalLeagues from '../../config/global-leagues.config';

import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .put('/', jwtMiddleware, async (req, res, next) =>
    userService
      .updateById(req.user.id, { favorite_club_id: req.body.clubId })
      .then(() => res.json({ message: 'Successfuly updated!' }).catch(next)),
  )
  .put('/update/:userId', jwtMiddleware, (req, res, next) => 
    userService
      .updateById(req.params.userId, req.body)
        .then(() => res.json({ message: 'Successfully updated!' }))
        .catch(next)
  )
  .put('/:user/:gameweek', (req, res, next) => {
    userService
      .updateById(req.params.user, req.body.userData)
      .then(() => {
        gameweekHistoryService
          .postCurrentHistoryById(req.params.user, req.params.gameweek)
          .then((gameweekHistoryId) => {
            teamMemberHistoryService
              .postTeamMemberHistory(
                req.body.teamMemberData,
                gameweekHistoryId,
                req.params.gameweek,
              )
              .then(() => {
                res.json({ message: 'Successfully saved!' });
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  })
  .put('/:user', jwtMiddleware, (req, res, next) =>
    userService
      .updateById(req.params.user, req.body)
      .then(() => res.json({ message: 'Your email preferences have been saved' }))
      .catch(next),
  )
  .post('/favorite-club', jwtMiddleware, async (req, res, next) => {
    try {
      await userService.updateById(req.user.id, { favorite_club_id: req.body.clubId });
      
      const club = await footballClubService.getFootballClubById(req.body.clubId);
      const isLeagueParticipant = await leagueParticipantService.checkIfAParticipantByName(
        req.user.id,
        club.name,
      );
      if (!isLeagueParticipant.length) {
        await leagueService.joinGlobalLeague(req.user.id, club.name);
      }

      res.json({ message: 'Successfuly updated favorite club!' });
    } catch (err) {
      next(err);
    }
  })
  .get('/fixtures-sub/:user', jwtMiddleware, (req, res, next) =>
    fixturesSubscriptionService
      .findSubscription(req.params.user)
      .then((value) =>
        value ? res.json(value) : res.json({ message: 'Subscription is not found' }),
      )
      .catch(next),
  )
  .post('/fixtures-sub', jwtMiddleware, (req, res, next) =>
    fixturesSubscriptionService
      .createSubscription(req.body)
      .then(() =>
        res.json({
          message: 'Successfuly subscribed to notifications about the fixture ',
        }),
      )
      .catch(next),
  )
  .delete('/fixtures-sub', jwtMiddleware, (req, res, next) =>
    fixturesSubscriptionService
      .deleteSubscription(req.body.user_id, req.body.game_id)
      .then(() => res.json({ message: 'Subscribtion succesfully deleted' }))
      .catch(next),
  )
  .get('/league-rankings', jwtMiddleware, (req, res, next) => {
    leagueParticipantService
      .getUserRankings(req.user.id)
      .then((value) => res.json(value))
      .catch(next);
  })
  .get('/leagues/mobile/:id', async (req, res, next) => {
    try {
      const leagues = await leagueService.getLeaguesByUserId(req.params.id);
      const result = {
        public: [],
        private: [],
        global: [],
      };

      await Promise.all(
        leagues.map(async (item) => {
          const { league } = item;
          const { start_from } = await leagueService.getLeagueParams(league.name);


          let gameweek_points = 0;
          let total_points = 0;

          const startScoringGameweek = await gameweekService.getGameweekById(start_from);
          const userGamaweekStats = await gameweekHistoryService.getHistoriesByUserId(
            req.params.id,
          );

          userGamaweekStats.forEach((data) => {
            if (startScoringGameweek.number <= data.gameweek.number) {
              gameweek_points = data.team_score;
              total_points += gameweek_points;
            }
          });
          
          if (league.private) {
              result.private.push({...item.toJSON(), gameweek_points, total_points});
            } else if (globalLeagues.includes(league.name)) {
              result.global.push({...item.toJSON(), gameweek_points, total_points});
            } else {
              result.public.push({...item.toJSON(), gameweek_points, total_points});
            }

          return result;
        })
      )

      res.json(result);
    } catch (err) {
      next(err);
    } 
  })
  .get('/leagues', jwtMiddleware, (req, res, next) => {
    leagueService
      .getLeaguesByUserId(req.user.id)
      .then((value) => {
        const result = {
          public: [],
          private: [],
          global: [],
        };

        value.forEach((item) => {
          const { league } = item;

          if (league.private) {
            result.private.push(item);
          } else if (globalLeagues.includes(league.name)) {
            result.global.push(item);
          } else {
            result.public.push(item);
          }

          return result;
        });

        res.json(result);
      })
      .catch(next);
  });

export default router;
