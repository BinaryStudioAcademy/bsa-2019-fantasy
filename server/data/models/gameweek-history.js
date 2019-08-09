export default (orm, DataTypes) => {
  const GameweekHistory = orm.define(
    'gameweek_history',
    {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return GameweekHistory;
};
