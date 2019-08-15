import { Router } from 'express';
import * as userService from '../services/user.service';
import * as leagueService from '../services/league.service';
import * as footballClubService from '../services/football-club.service';
import globalLeagues from '../../config/global-leagues.config';

import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .put('/', jwtMiddleware, async (req, res, next) =>
    userService
      .updateById(req.user.id, { favorite_club_id: req.body.clubId })
      .then(() => res.json({ message: 'Successfuly updated!' }).catch(next)),
  )

  .post('/favorite-club', jwtMiddleware, async (req, res, next) => {
    try {
      await userService.updateById(req.user.id, { favorite_club_id: req.body.clubId });

      const club = await footballClubService.getFootballClubById(req.body.clubId);
      await leagueService.joinGlobalLeague(req.user.id, club.name);

      res.json({ message: 'Successfuly updated favorite club!' });
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
