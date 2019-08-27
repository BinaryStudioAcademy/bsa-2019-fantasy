export default (models) => {
  const {
    User,
    PlayerStat,
    PlayerMatchStat,
    League,
    LeagueParticipant,
    GameweekHistory,
    Game,
    Gameweek,
    FootballClub,
    Event,
    TeamMemberHistory,
  } = models;

  User.belongsTo(FootballClub, { foreignKey: 'favorite_club_id', as: 'football_club' });
  User.hasMany(LeagueParticipant, {
    foreignKey: 'participant_id',
    as: 'league_participants',
  });

  LeagueParticipant.belongsTo(League, { foreignKey: 'league_id', as: 'league' });
  LeagueParticipant.belongsTo(User, { foreignKey: 'participant_id', as: 'user' });

  League.hasMany(LeagueParticipant, {
    foreignKey: 'league_id',
    as: 'league_participants',
  });
  League.belongsTo(Gameweek, { foreignKey: 'start_from', as: 'gameweek' });

  TeamMemberHistory.belongsTo(PlayerStat, {
    foreignKey: 'player_id',
    as: 'player_stats',
  });
  TeamMemberHistory.belongsTo(GameweekHistory, {
    foreignKey: 'gameweek_history_id',
    as: 'gameweek_history',
  });

  GameweekHistory.belongsTo(Gameweek, {
    foreignKey: 'gameweek_id',
    as: 'Gameweek',
  });
  GameweekHistory.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  });
  GameweekHistory.hasMany(TeamMemberHistory, {
    foreignKey: 'gameweek_history_id',
    as: 'team_member_histories',
  });

  Game.belongsTo(FootballClub, { foreignKey: 'hometeam_id', as: 'hometeam' });
  Game.belongsTo(FootballClub, { foreignKey: 'awayteam_id', as: 'awayteam' });
  Event.belongsTo(PlayerMatchStat, { foreignKey: 'player_match_stat_id', as: 'player' });

  GameweekHistory.belongsTo(Gameweek, { foreignKey: 'gameweek_id', as: 'gameweek' });

  PlayerMatchStat.belongsTo(PlayerStat, { foreignKey: 'player_id', as: 'player' });

  // You can use templates below to test associations (run npm start)

  // User.findOne({
  //   where: { email: 'demo@demo.com' },
  //   include: 'football_club',
  // }).then((findedUser) => {
  //   console.log(findedUser);
  // });

  // League.findOne({ where: { name: 'league1' }, include: ['league_participants'] }).then(
  //   (league) => {
  //     // Get the League with League participants data included
  //     console.log(league);

  //     // Get the League participants records only
  //     // console.log(league.get().league_participants);
  //   },
  // );

  // TeamMemberHistory.findOne({
  //   where: { is_captain: true },
  //   include: 'player_stats',
  // }).then((teamMember) => {
  //   console.log(teamMember);
  // });
};
