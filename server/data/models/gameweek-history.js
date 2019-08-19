export default (orm, DataTypes) => {
  const GameweekHistory = orm.define(
    'gameweek_history',
    {
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      gameweek_id: {
        type: DataTypes.UUID,
        references: {
          model: 'gameweeks',
          key: 'id',
        },
      },
      team_score: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return GameweekHistory;
};
