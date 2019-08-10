export default (orm, DataTypes) => {
  const User = orm.define(
    'user',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      money: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      score: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      team_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      chip_used: {
        allowNull: false,
        type: DataTypes.ENUM(
          'wildcard',
          'triple_caption',
          'bench_boost'
        )
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return User;
};
