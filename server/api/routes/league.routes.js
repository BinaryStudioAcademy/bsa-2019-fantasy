import { Router } from 'express';
import * as leagueService from '../services/league.service';

const router = Router();

router
    .get('/', (req, res, next) =>
        leagueService
            .getAllLeagues()
            .then(value => res.json(value))
            .catch(next)
    )
    .get('/:id', (req, res, next) =>
        leagueService
            .getLeagueById(req.params.id)
            .then(value => res.json(value))
            .catch(next)
    )
    .post('/', (req, res, next) =>
        leagueService
            .createLeague(req.body.userId, req.body.body)
            .then(value => res.json(value))
            .catch(next)
    )
    .put('/:id', (req, res, next) =>
        leagueService
            .updateLeague(req.params.id, req.body)
            .then(post => res.send(post))
            .catch(next)
    )
    .delete('/:id', (req, res, next) =>
        leagueService
            .deleteLeagueById(req.params.id)
            .then(status => res.send({ deleted: status }))
            .catch(next)
    );

export default router;
