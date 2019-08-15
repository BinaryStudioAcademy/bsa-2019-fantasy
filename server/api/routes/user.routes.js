import { Router } from 'express';
import * as userService from '../services/user.service';

import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router.get('/:id', jwtMiddleware, (req, res, next) =>
  userService
    .getUserById(req.params.id)
    .then((value) => res.json(value))
    .catch(next),
);

export default router;
