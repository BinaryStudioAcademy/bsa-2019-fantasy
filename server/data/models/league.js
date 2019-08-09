export default (orm, DataTypes) => {
  const League = orm.define(
    'league',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      private: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return League;
};
