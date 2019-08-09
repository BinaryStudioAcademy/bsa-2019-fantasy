export default (orm, DataTypes) => {
    const LeagueParticipants = orm.define(
        'league_participants',
        {
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {}
    );

    return LeagueParticipants;
};
