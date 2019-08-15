import { Router } from 'express';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import * as leagueService from '../services/league.service';
import facebookAuthRedirectMiddleware from '../middlewares/fb-auth-redirect.middleware';
import facebookAuthMiddleware from '../middlewares/fb-auth.middleware';
import loginMiddleware from '../middlewares/login.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';
import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .get('/fb', facebookAuthMiddleware)
  .get('/fb/callback', facebookAuthRedirectMiddleware, (req, res, next) =>
    res.json(req.user),
  )
  .post('/login', loginMiddleware, (req, res, next) =>
    authService
      .login(req.user)
      .then((data) => res.send(data))
      .catch(next),
  )
  .post('/registration', registrationMiddleware, (req, res, next) =>
    authService
      .register(req.user)
      .then((data) =>
        leagueService
          .joinGlobalLeague(data.user.id, 'Overall')
          .then(() => res.send(data))
          .catch(next),
      )
      .catch(next),
  )
  .get('/user', jwtMiddleware, (req, res, next) =>
    userService
      .getUserById(req.user.id)
      .then((data) => res.send(data))
      .catch(next),
  );

export default router;
