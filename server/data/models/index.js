import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Season = orm.import('./season');
const PlayerStat = orm.import('./player-stat');
const PlayerMatchStat = orm.import('./player-match-stat');
const League = orm.import('./league');
const LeagueParticipant = orm.import('./league-participant');
const Gameweek = orm.import('./gameweek');
const GameweekHistory = orm.import('./gameweek-history');
const Game = orm.import('./game');
const FootballClub = orm.import('./football-club');
const Event = orm.import('./event');
const TeamMemberHistory = orm.import('./team-member-history');
const Image = orm.import('./image');

associate({
  User,
  Season,
  PlayerStat,
  PlayerMatchStat,
  League,
  LeagueParticipant,
  Gameweek,
  GameweekHistory,
  Game,
  FootballClub,
  Event,
  TeamMemberHistory,
  Image
});

export {
  User as UserModel,
  Season as SeasonModel,
  PlayerStat as PlayerStatModel,
  PlayerMatchStat as PlayerMatchStatModel,
  League as LeagueModel,
  LeagueParticipant as LeagueParticipantModel,
  Gameweek as GameweekModel,
  GameweekHistory as GameweekHistoryModel,
  Game as GameModel,
  FootballClub as FootballClubModel,
  Event as EventModel,
  TeamMemberHistory as TeamMemberHistoryModel,
  Image as ImageModel
};
