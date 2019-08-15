import { Router } from 'express';
import * as leagueService from '../services/league.service';
import {
  createLeagueMiddleware,
  joinLeagueMiddleware,
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
  .get('/:id', (req, res, next) =>
    leagueService
      .getLeagueById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .post('/', createLeagueMiddleware, jwtMiddleware, (req, res, next) =>
    leagueService
      .createLeague(req.body.name)
      .then((value) =>
        leagueService
          .joinLeague(req.user.id, value.id, true)
          .then(() =>
            res.json({
              message: `Successfully created a league with '${value.name}' name`,
            }),
          )
          .catch(next),
      )
      .catch(next),
  )
  .post('/join', joinLeagueMiddleware, jwtMiddleware, (req, res, next) => {
    leagueService
      .joinLeague(req.user.id, req.body.code, false)
      .then(() => res.json({ message: 'Successfully joined a league' }))
      .catch(next);
  })

  .post('/search/public', (req, res, next) => {
    leagueService
      .getLeaguesByName(req.body.filter)
      .then((value) => res.json(value))
      .catch(next);
  })

  .post('/search/private', (req, res, next) => {
    leagueService
      .getLeaguesByNameOrId(req.body.filter)
      .then((value) => res.json(value))
      .catch(next);
  })

  .put('/:id', (req, res, next) =>
    leagueService
      .updateLeague(req.params.id, req.body)
      .then((post) => res.send(post))
      .catch(next),
  )
  .delete('/:id', (req, res, next) =>
    leagueService
      .deleteLeagueById(req.params.id)
      .then((status) => res.send({ deleted: status }))
      .catch(next),
  );
/* eslint-disable */
router.use(function(err, req, res, next) {
  res.status(500).json({ message: 'Something went wrong! Try again.' });
});
/* eslint-enable */

export default router;
