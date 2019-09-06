export default {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'club_email', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn('users', 'club_notif', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn('users', 'team_email', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn('users', 'team_notif', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'club_email'),
      queryInterface.removeColumn('users', 'club_notif'),
      queryInterface.removeColumn('users', 'team_email'),
      queryInterface.removeColumn('users', 'team_notif'),
    ]);
  },
};
