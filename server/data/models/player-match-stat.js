export default (orm, DataTypes) => {
  const PlayerMatchStat = orm.define(
    'player_match_stat',
    {
      goals: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      assists: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      missed_passes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      goals_conceded: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      saves: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      yellow_cards: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      red_cards: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      player_id: {
        type: DataTypes.UUID,
        references: {
          model: 'player_stats',
          key: 'id',
        },
      },
      injury: DataTypes.DATE,
      game_id: {
        type: DataTypes.UUID,
        references: {
          model: 'games',
          key: 'id',
        },
      },
    },
    {},
  );

  return PlayerMatchStat;
};
