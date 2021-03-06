import { Router } from 'express';
import * as eventService from '../services/event.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    eventService
      .getAllEvents()
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/last', (req, res, next) =>
    eventService
      .getLastUpdatedEvent(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/:id', (req, res, next) =>
    eventService
      .getEventById(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  )
  .get('/game/:id', (req, res, next) =>
    eventService
      .getEventByGameId(req.params.id)
      .then((value) => res.json(value))
      .catch(next),
  );

export default router;
