export default (orm, DataTypes) => {
  const Event = orm.define(
    'event',
    {
      timestamp: DataTypes.DATE,
      event_type: {
        allowNull: false,
        type: DataTypes.ENUM(
          'goal',
          'assist',
          'missed_passes',
          'goal_conceded',
          'save',
          'yellow_card',
          'red_card'
        )
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Event;
};
