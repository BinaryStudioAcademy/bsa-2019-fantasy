export default (models) => {
  const {
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
    Event: MyEvent,
    TeamMemberHistory,
  } = models;

  User.hasOne(FootballClub);

  // User.hasMany(LeagueParticipant);

  // Game.hasMany(FootballClub);

  // PlayerMatchStat.hasMany(MyEvent);
  // MyEvent.hasMany(Game);

  // PlayerStat.hasMany(GameweekHistory);
  // PlayerStat.hasMany(FootballClub);

  // FootballClub.hasMany(Game);

  // Gameweek.hasMany(GameweekHistory);
  // Gameweek.hasMany(Game);

  // League.hasMany(LeagueParticipant);
  // Season.hasMany(Gameweek);
};
