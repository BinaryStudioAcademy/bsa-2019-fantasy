import { Router } from 'express';
import * as gameweekService from '../services/gameweek.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    gameweekService
      .getGameweeks()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:id', (req, res, next) =>
    gameweekService
      .getGameweekById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  );

export default router;
