import { Router } from 'express';
import * as playerMatchService from '../services/player-match.service';

const router = Router();

router
    .get('/', (req, res, next) =>
        playerMatchService
            .getAllPlayerMatch()
            .then(value => res.json(value))
            .catch(next)
    )
    .get('/:id', (req, res, next) =>
        playerMatchService
            .getPlayerMatchById(req.params.id)
            .then(value => res.json(value))
            .catch(next)
    );

export default router;
