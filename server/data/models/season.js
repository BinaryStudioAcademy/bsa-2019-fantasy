export default (orm, DataTypes) => {
  const Season = orm.define(
    'season',
    {
      name: {
        allowNull: false,
        type: DataTypes.String
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Season;
};
