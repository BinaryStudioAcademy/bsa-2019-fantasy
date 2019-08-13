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

    Game.belongsTo(FootballClub, { foreignKey: 'hometeam_id', as: 'hometeam' })
    Game.belongsTo(FootballClub, { foreignKey: 'awayteam_id', as: 'awayteam' })

    // Game.belongsTo(FootballClub, { foreignKey: 'hometeam_id', as: 'hometeam' });
  
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
  };