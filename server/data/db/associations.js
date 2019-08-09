export default models => {
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
        Event: MyEvent
    } = models;

    Game.hasMany(FootballClub);
    Game.hasMany(Gameweek);

    PlayerMatchStat.hasMany(MyEvent);
    MyEvent.hasMany(Game);

    PlayerStat.hasMany(GameweekHistory);

    FootballClub.hasMany(PlayerStat);
    FootballClub.hasMany(Game);

    Gameweek.hasMany(GameweekHistory);

    // League.belongsToMany(User);
    League.hasMany(LeagueParticipant);
    LeagueParticipant.hasMany(User);
    Season.hasMany(Gameweek);
};
