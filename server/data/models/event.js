export default (orm, DataTypes) => {
  const Event = orm.define(
    'event',
    {
      event_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      time: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return Event;
};
