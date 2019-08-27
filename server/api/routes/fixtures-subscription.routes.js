import { Router } from 'express';
import * as fixturesSubscriptionService from '../services/fixtures-subscription.service';

const router = Router();

router.post('/', (req, res, next) =>
  fixturesSubscriptionService
    .createSubscription(req.body)
    .then((value) => res.json(value))
    .catch(next),
);

export default router;
