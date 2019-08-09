import { Router } from 'express';
import * as playerService from '../services/player.service';

const router = Router();

router
    .get('/', (req, res, next) =>
        playerService
            .getPlayers()
            .then(value => res.json(value))
            .catch(next)
    )
    .get('/:id', (req, res, next) =>
        playerService
            .getPlayerById(req.params.id)
            .then(value => res.json(value))
            .catch(next)
    );

export default router;
