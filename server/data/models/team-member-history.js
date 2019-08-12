export default (orm, DataTypes) => {
  const GameweekHistory = orm.define(
    'team_member_history',
    {
      is_on_bench: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      is_captain: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return GameweekHistory;
};
