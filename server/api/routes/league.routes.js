import { Router } from 'express';
import * as leagueService from '../services/league.service';

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
  .post('/', (req, res, next) =>
    leagueService
      .createLeague(req.body.userId, req.body.body)
      .then((value) => res.json(value))
      .catch(next),
  )
  .post('/join', (req, res, next) => {
    leagueService
      .getLeagueById(req.body.code)
      .then((league) => {
        if (league) {
          leagueService
            .joinLeague(req.user.id, req.body.code)
            .then(() => res.json({ message: 'Successfully joined a league' }))
            .catch(next);
        } else {
          res.status(400).json({ message: 'Invalid League Code provided' });
        }
      })
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

export default router;
