import { Router } from 'express';
import * as leagueParticipantService from '../services/league-participant.service';

const router = Router();

router.get('/:id', (req, res, next) =>
    leagueParticipantService
        .getleagueParticipantById(req.params.id)
        .then(value => res.json(value))
        .catch(next)
);

export default router;
