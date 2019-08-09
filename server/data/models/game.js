export default (orm, DataTypes) => {
  const Game = orm.define(
    'game',
    {
      start: {
        type: DataTypes.DATE
      },
      end: {
        type: DataTypes.DATE
      },
      hometeam_score: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      awayteam_score: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return Game;
};
