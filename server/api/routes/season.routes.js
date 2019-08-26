import { Router } from 'express';
import * as seasonService from '../services/season.service';

const router = Router();

router.get('/:id', (req, res, next) =>
  seasonService
    .getSeasonById(req.params.id)
    .then((value) => res.json(value))
    .catch(next),
);

export default router;
