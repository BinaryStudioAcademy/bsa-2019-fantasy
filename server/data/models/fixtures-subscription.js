export default (orm, DataTypes) => {
  const FixturesSubscription = orm.define(
    'fixtures_subscriptions',
    {
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      game_id: {
        type: DataTypes.UUID,
        references: {
          model: 'games',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return FixturesSubscription;
};
