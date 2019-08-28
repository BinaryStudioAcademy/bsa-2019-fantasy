export default {
  // eslint-disable-next-line max-len
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          'users',
          'favorite_club_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'player_stats',
          'club_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'games',
          'hometeam_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'games',
          'awayteam_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'gameweeks',
          'season_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'seasons',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'user_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'gameweek_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweeks',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'fixtures_subscriptions',
          'user_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'fixtures_subscriptions',
          'game_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'games',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'events',
          'player_match_stat_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_match_stats',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'events',
          'game_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'games',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'leagues',
          'start_from',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweeks',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'league_participants',
          'league_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'leagues',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'league_participants',
          'participant_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'team_member_histories',
          'player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'team_member_histories',
          'gameweek_history_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweek_histories',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'player_match_stats',
          'player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'player_match_stats',
          'game_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'games',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
      ]),
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn('users', 'favorite_club_id', {
          transaction,
        }),
        queryInterface.removeColumn('player_stats', 'club_id', {
          transaction,
        }),
        queryInterface.removeColumn('games', 'hometeam_id', {
          transaction,
        }),
        queryInterface.removeColumn('games', 'awayteam_id', {
          transaction,
        }),
        queryInterface.removeColumn('games', 'gameweek_id', {
          transaction,
        }),
        queryInterface.removeColumn('gameweeks', 'season_id', {
          transaction,
        }),
        queryInterface.removeColumn('gameweek_histories', 'user_id', {
          transaction,
        }),
        queryInterface.removeColumn('gameweek_histories', 'gameweek_id', {
          transaction,
        }),
        queryInterface.removeColumn('events', 'player_match_stat_id', {
          transaction,
        }),
        queryInterface.removeColumn('events', 'game_id', {
          transaction,
        }),
        queryInterface.removeColumn('leagues', 'start_from', {
          transaction,
        }),
        queryInterface.removeColumn('league_participants', 'league_id', {
          transaction,
        }),
        queryInterface.removeColumn('league_participants', 'participant_id', {
          transaction,
        }),
        queryInterface.removeColumn('team_member_histories', 'player_id', {
          transaction,
        }),
        queryInterface.removeColumn('team_member_histories', 'gameweek_history_id', {
          transaction,
        }),
        queryInterface.removeColumn('player_match_stats', 'player_id', {
          transaction,
        }),
        queryInterface.removeColumn('player_match_stats', 'game_id', {
          transaction,
        }),
      ]),
    ),
};
