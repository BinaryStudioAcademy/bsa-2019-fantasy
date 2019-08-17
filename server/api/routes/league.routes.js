import { Router } from 'express';
import * as leagueService from '../services/league.service';
import * as leagueParticipantService from '../services/league-participant.service';
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
  .post('/join', joinLeagueMiddleware, jwtMiddleware, async (req, res, next) => {
    try {
      const result = await leagueParticipantService.checkIfAParticipant(
        req.user.id,
        req.body.code,
      );
      if (result.length) {
        res.status(400).json({ message: 'You have already joined this league' });
      } else {
        await leagueService.joinLeague(req.user.id, req.body.code, false);
        res.json({ message: 'Successfully joined a league' });
      }
    } catch (err) {
      next(err);
    }
  })
  .post('/search/public', (req, res, next) => {
    leagueService
      .searchLeaguesByName(req.body.filter)
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
// router.use(function(err, req, res, next) {
//   console.log(req.body);
//   res.status(500).json({ message: err });
// });
/* eslint-enable */

export default router;
