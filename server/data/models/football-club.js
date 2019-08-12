export default (orm, DataTypes) => {
  const FootballClub = orm.define(
    'football_club',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      short_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      win: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      loss: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      played: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      code: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return FootballClub;
};
