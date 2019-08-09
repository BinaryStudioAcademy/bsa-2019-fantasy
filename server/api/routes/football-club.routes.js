import { Router } from 'express';
import * as footballClubService from '../services/football-club.service';

const router = Router();

router
    .get('/', (req, res, next) =>
        footballClubService
            .getAllFootballClubs()
            .then(value => res.json(value))
            .catch(next)
    )
    .get('/:id', (req, res, next) =>
        footballClubService
            .getFootballClubById(req.params.id)
            .then(value => res.json(value))
            .catch(next)
    );

export default router;
