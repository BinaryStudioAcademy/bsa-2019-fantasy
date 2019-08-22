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
        allowNull: true,
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
        allowNull: true,
        type: DataTypes.STRING,
      },
      chip_used: {
        allowNull: false,
        type: DataTypes.ENUM('wildcard', 'triple_caption', 'bench_boost'),
        defaultValue: 'wildcard',
      },
      facebook_id: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
      },
      free_transfers: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return User;
};
