import { Router } from 'express';
import * as leagueParticipantService from '../services/league-participant.service';
import * as leagueService from '../services/league.service';
import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .get('/:id', (req, res, next) =>
    leagueParticipantService
      .getleagueParticipantById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .delete('/', jwtMiddleware, (req, res, next) =>
    leagueService
      .getLeagueByName(req.body.name)
      .then(({ id }) =>
        leagueParticipantService
          .leaveLeague(req.user.id, id)
          .then(() => res.json({ message: 'Successfully left a league' }))
          .catch(next),
      )
      .catch(next),
  );

export default router;
