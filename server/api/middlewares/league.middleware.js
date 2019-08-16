import * as leagueService from '../services/league.service';
/* eslint-disable */
export const createLeagueMiddleware = function(req, res, next) {
  leagueService
    .getLeaguesByName(req.body.name)
    .then((leagues) => {
      if (!leagues.length) {
        return next();
      } else {
        res.status(400).json({ message: 'League with current name already exists' });
      }
    })
    .catch(next);
};

export const joinLeagueMiddleware = function(req, res, next) {
  leagueService
    .getLeagueById(req.body.code)
    .then((league) => {
      if (league && league.private === req.body.private) {
        return next();
      } else {
        res.status(400).json({ message: 'Invalid League Code provided' });
      }
    })
    .catch(next);
};
