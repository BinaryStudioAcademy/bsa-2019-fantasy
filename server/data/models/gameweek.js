export default (orm, DataTypes) => {
  const Gameweek = orm.define(
    'gameweek',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      start: {
        type: DataTypes.DATE,
      },
      end: {
        type: DataTypes.DATE,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return Gameweek;
};
