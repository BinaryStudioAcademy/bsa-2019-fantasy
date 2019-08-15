import { Router } from 'express';
import * as userService from '../services/user.service';

import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .put('/', jwtMiddleware, async (req, res, next) =>
    userService
      .updateById(req.user.id, { favorite_club_id: req.body.clubId })
      .then(() => res.json({ message: 'Successfuly updated!' }).catch(next)),
  )
  .post('/favorite-club', jwtMiddleware, async (req, res, next) => {
    try {
      await userService.updateById(req.user.id, { favorite_club_id: req.body.clubId });

      // FIXME: ???
      // await leagueService.joinGlobalLeague(req.user.id, req.body.clubId);

      res.json({ message: 'Successfuly updated favorite club!' });
    } catch (err) {
      next(err);
    }
  });

export default router;
