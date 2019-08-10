import { Router } from 'express';
import * as gameweekHistoryService from '../services/gameweek-history.service';

const router = Router();

router
    .get('/', (req, res, next) =>
        gameweekHistoryService
            .getAllHistory()
            .then(value => res.json(value))
            .catch(next)
    )
    .get('/:id', (req, res, next) =>
        gameweekHistoryService
            .getHistoryById(req.params.id)
            .then(value => res.json(value))
            .catch(next)
    );

export default router;
