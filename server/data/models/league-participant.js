export default (orm, DataTypes) => {
  const LeagueParticipants = orm.define(
    'league_participants',
    {
      is_creator: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return LeagueParticipants;
};
