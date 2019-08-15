import { Router } from 'express';
import * as userService from '../services/user.service';
import * as leagueService from '../services/league.service';
import globalLeagues from '../../config/global-leagues.config';

import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .get('/leagues', (req, res, next) => {
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
  })
  .get('/:id', jwtMiddleware, (req, res, next) =>
    userService
      .getUserById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .put('/club', (req, res, next) =>
    // TODO: fix updating user favourite club
    userService
      .updateById(req.user.id, req.body.club)
      .then(() =>
        leagueService
          .joinGlobalLeague(req.user.id, req.body.club.name)
          .then(() => res.json({ message: 'Successfuly updated' }))
          .catch(next),
      )
      .catch(next),
  );

export default router;
