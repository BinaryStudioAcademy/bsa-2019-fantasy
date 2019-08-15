import { Router } from 'express';
import * as userService from '../services/user.service';
import * as leagueService from '../services/league.service';

const router = Router();

router
  .get('/leagues', (req, res, next) => {
    leagueService
      .getLeaguesByUserId(req.user.id)
      .then((value) => res.json(value))
      .catch(next);
  })
  .get('/:id', (req, res, next) =>
    userService
      .getUserById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .put('/club', (req, res, next) =>
    // TODO: fix updating user favourite club
    userService
      .updateById(req.user.id, req.body.club)
      .then(() =>
        leagueService
          .joinGlobalLeague(req.user.id, req.body.club.name)
          .then(() => res.json({ message: 'Successfuly updated' }))
          .catch(next),
      )
      .catch(next),
  );
export default router;
