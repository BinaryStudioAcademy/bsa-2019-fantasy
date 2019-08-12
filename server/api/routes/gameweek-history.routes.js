import { Router } from 'express';
import * as gameweekHistoryService from '../services/gameweek-history.service';
import * as playerHistoryService from '../services/player.service';

const router = Router();

router
  .get('/', (req, res, next) =>
    gameweekHistoryService
      .getAllHistory()
      .then(value => res.json(value))
      .catch(next)
  )
  .get('/:id', (req, res, next) =>
    gameweekHistoryService
      .getHistoryById(req.params.id)
      .then(async value => {
        const { team_players_id, team_bench_player_id, team_captain_id } = value;

        const promisesTeam = team_players_id.map(async id => {
          const player = await playerHistoryService.getPlayerById(id);
          return player;
        });
        const team = await Promise.all(promisesTeam);

        const promisesBench = team_bench_player_id.map(async id => {
          const player = await playerHistoryService.getPlayerById(id);
          return player;
        });
        const bench = await Promise.all(promisesBench);

        const captain = await playerHistoryService.getPlayerById(team_captain_id);

        res.json({ team, bench, captain });
      })
      .catch(next)
  );

export default router;
