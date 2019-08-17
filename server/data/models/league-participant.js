export default (orm, DataTypes) => {
  const LeagueParticipants = orm.define(
    'league_participants',
    {
      is_creator: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      current_rank: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      last_rank: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return LeagueParticipants;
};
