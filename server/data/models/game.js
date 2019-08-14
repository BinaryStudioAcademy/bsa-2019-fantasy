export default (orm, DataTypes) => {
  const Game = orm.define(
    'game',
    {
      start: {
        type: DataTypes.DATE,
      },
      started: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      finished: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      minutes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      hometeam_score: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      awayteam_score: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      gameweek_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      hometeam_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      awayteam_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return Game;
};
