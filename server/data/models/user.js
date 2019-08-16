export default (orm, DataTypes) => {
  const User = orm.define(
    'user',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      money: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 1000,
      },
      score: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      team_name: {
        allowNull: true, // FIXME: CHECK THIS ONE
        type: DataTypes.STRING,
      },
      is_team_created: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      chip_used: {
        allowNull: false,
        type: DataTypes.ENUM('wildcard', 'triple_caption', 'bench_boost'),
        defaultValue: 'wildcard',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return User;
};
