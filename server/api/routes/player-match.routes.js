import { Router } from 'express';
import * as playerMatchService from '../services/player-match.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    playerMatchService
      .getAllPlayerMatch()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:id', (req, res, next) =>
    playerMatchService
      .getPlayerMatchById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/by-gameweeks/:id', (req, res, next) =>
    playerMatchService
      .getPlayerStatsByGameweeks(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/next-fixture/:id', (req, res, next) =>
    playerMatchService
      .getNextFixtures()
      .then((fixtures) =>
        playerMatchService
          .getNextFixtureForPlayer(req.params.id, fixtures)
          .then((result) => res.json(result))
          .catch(next),
      )
      .catch(next),
  );

export default router;
