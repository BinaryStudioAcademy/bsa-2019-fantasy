import { Router } from 'express';
import * as userService from '../services/user.service';
import * as leagueService from '../services/league.service';
import * as leagueParticipantService from '../services/league-participant.service';
import * as footballClubService from '../services/football-club.service';
import * as gameweekHistoryService from '../services/gameweek-history.service';
import * as teamMemberHistoryService from '../services/team-member-history.service';
import globalLeagues from '../../config/global-leagues.config';

import jwtMiddleware from '../middlewares/jwt.middleware';

const router = Router();

router
  .put('/', jwtMiddleware, async (req, res, next) =>
    userService
      .updateById(req.user.id, { favorite_club_id: req.body.clubId })
      .then(() => res.json({ message: 'Successfuly updated!' }).catch(next)),
  )
  .put('/:id', jwtMiddleware, async (req, res, next) => {
    try {
      const userData = { money: req.body.money, team_name: req.body.team_name };
      const { gameweek_id } = req.body;
      const { squad } = req.body;
      await userService.updateById(req.params.id, userData);
      const gameweekHistoryId = await gameweekHistoryService.postCurrentHistoryById(
        req.params.id,
        gameweek_id,
      );
      const teamMemberData = squad.map((id, i) => ({
        player_id: id,
        is_on_bench: i % 4 === 0,
        is_captain: i === 1,
      }));
      const teamMemberHistory = await teamMemberHistoryService.postTeamMemberHistory(
        teamMemberData,
        gameweekHistoryId,
      );
      res.json({ message: 'Successfully saved!' });
    } catch (err) {
      next(err);
    }
  })
  .post('/favorite-club', jwtMiddleware, async (req, res, next) => {
    try {
      await userService.updateById(req.user.id, { favorite_club_id: req.body.clubId });

      const club = await footballClubService.getFootballClubById(req.body.clubId);
      await leagueService.joinGlobalLeague(req.user.id, club.name);

      res.json({ message: 'Successfuly updated favorite club!' });
    } catch (err) {
      next(err);
    }
  })
  .get('/league-rankings', jwtMiddleware, (req, res, next) => {
    leagueParticipantService
      .getUserRankings(req.user.id)
      .then((value) => res.json(value))
      .catch(next);
  })
  .get('/leagues', jwtMiddleware, (req, res, next) => {
    leagueService
      .getLeaguesByUserId(req.user.id)
      .then((value) => {
        const result = {
          public: [],
          private: [],
          global: [],
        };

        value.forEach((item) => {
          const { league } = item;

          if (league.private) {
            result.private.push(item);
          } else if (globalLeagues.includes(league.name)) {
            result.global.push(item);
          } else {
            result.public.push(item);
          }

          return result;
        });

        res.json(result);
      })
      .catch(next);
  });

export default router;
