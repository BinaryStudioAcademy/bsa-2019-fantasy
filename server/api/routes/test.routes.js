import { Router } from 'express';
import * as testService from '../services/test.service';

const router = Router();

router
    .get('/', (req, res, next) => testService.getTestValue(req.query)
        .then(value => res.json(value))
        .catch(next))
    .post('/', (req, res, next) => testService.replaceTestValue(req.body)
        .then((result) => res.json(result))
        .catch(next))

export default router;
