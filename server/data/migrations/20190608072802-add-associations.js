export default {
  // eslint-disable-next-line max-len
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(transaction =>
      Promise.all([
        queryInterface.addColumn(
          'users',
          'league_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'leagues',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'users',
          'favorite_club_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'users',
          'game_week_history_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweek_histories',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'player_stats',
          'club_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'hometeam_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'awayteam_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'football_clubs',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'games',
          'game_event_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'events',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweeks',
          'game_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'games',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'gameweek_active_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweeks',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'team_player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'team_captain_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'gameweek_histories',
          'team_bench_player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_stats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'events',
          'player_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'player_match_stats',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'leagues',
          'creator_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'league_participants',
          'league_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'leagues',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'league_participants',
          'participant_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'seasons',
          'gameweek_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'gameweeks',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          { transaction }
        )
      ])
    ),

  down: queryInterface =>
    queryInterface.sequelize.transaction(transaction =>
      Promise.all([
        queryInterface.removeColumn('users', 'league_id', {
          transaction
        }),
        queryInterface.removeColumn('users', 'favorite_club_id', {
          transaction
        }),
        queryInterface.removeColumn('users', 'game_week_history_id', {
          transaction
        }),
        queryInterface.removeColumn('player_stats', 'club_id', {
          transaction
        }),
        queryInterface.removeColumn('games', 'hometeam_id', {
          transaction
        }),
        queryInterface.removeColumn('games', 'awayteam_id', {
          transaction
        }),
        queryInterface.removeColumn('games', 'game_event_id', {
          transaction
        }),
        queryInterface.removeColumn('gameweeks', 'game_id', {
          transaction
        }),
        queryInterface.removeColumn('gameweek_histories', 'gameweek_active_id', {
          transaction
        }),
        queryInterface.removeColumn('gameweek_histories', 'team_player_id', {
          transaction
        }),
        queryInterface.removeColumn('gameweek_histories', 'team_captain_id', {
          transaction
        }),
        queryInterface.removeColumn('events', 'player_id', {
          transaction
        }),
        queryInterface.removeColumn('leagues', 'creator_id', {
          transaction
        }),
        queryInterface.removeColumn('league_participants', 'league_id', {
          transaction
        }),
        queryInterface.removeColumn('league_participants', 'participant_id', {
          transaction
        }),
        queryInterface.removeColumn('seasons', 'gameweek_id', {
          transaction
        })
      ])
    )
};
