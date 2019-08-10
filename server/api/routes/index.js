import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import playerRoutes from './player.routes';
import seasonRoutes from './season.routes';
import gameweekRoutes from './gameweek.routes';
import leagueParticipantRoutes from './league-participant.routes';
import footballClubRoutes from './football-club.routes';
import playerMatchRoutes from './player-match.routes';
import leagueRoutes from './league.routes';
import gameweekHistoryRoutes from './gameweek-history.routes';
import eventRoutes from './event.routes';
import gameRoutes from './game.routes';

// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/players', playerRoutes);
    app.use('/api/seasons', seasonRoutes);
    app.use('/api/gameweeks', gameweekRoutes);
    app.use('/api/league-participants', leagueParticipantRoutes);
    app.use('/api/teams', footballClubRoutes);
    app.use('/api/player-match-stats', playerMatchRoutes);
    app.use('/api/leagues', leagueRoutes);
    app.use('/api/gameweek-history', gameweekHistoryRoutes);
    app.use('/api/events', eventRoutes);
    app.use('/api/games', gameRoutes);
};
