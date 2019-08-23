import { Router } from 'express';
import * as gameService from '../services/game.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    gameService
      .getAllGames()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/current', (req, res, next) =>
    gameService
      .getCurrentGame()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:id', (req, res, next) =>
    gameService
      .getGameById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:id/gameweek', (req, res, next) =>
    gameService
      .getGameByGameweekId(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/player/:playerId/:clubId', (req, res, next) =>
    gameService
      .getFixturesForPlayer(req.params.playerId, req.params.clubId)
      .then((value) => res.json(value))
      .catch(next),
  );

export default router;
