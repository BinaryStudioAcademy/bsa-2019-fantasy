import { Router } from 'express';
import * as userService from '../services/user.service';

const router = Router();

router.get('/:id', (req, res, next) =>
    userService
        .getUserById(req.params.id)
        .then(value => res.json(value))
        .catch(next)
);

export default router;
