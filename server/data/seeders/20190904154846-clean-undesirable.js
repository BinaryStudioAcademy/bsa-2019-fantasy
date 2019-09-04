import playersSeed from '../seed-data/player-stats.seed';
import playerMatchSeed from '../seed-data/player-match-stats.seed';
import gamesSeed from '../seed-data/games.seed';
import eventsSeed from '../seed-data/events.seed';

import footballClubsSeed from '../seed-data/football-clubs.seed';
import gameweeksSeed from '../seed-data/gameweeks.seed';
import leaguesSeed from '../seed-data/leagues.seed';
import seasonsSeed from '../seed-data/seasons.seed';

const randomIndex = (length) => Math.floor(Math.random() * length);

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      let seedsData;
      const options = {
        type: Sequelize.QueryTypes.SELECT,
      };

      seedsData = await footballClubsSeed;
      await queryInterface.bulkInsert('football_clubs', seedsData, {});

      seedsData = await playersSeed;
      await queryInterface.bulkInsert('player_stats', seedsData, {});

      seedsData = await gamesSeed;
      await queryInterface.bulkInsert('games', seedsData, {});

      seedsData = await playerMatchSeed;
      await queryInterface.bulkInsert('player_match_stats', seedsData, {});

      seedsData = await eventsSeed;
      await queryInterface.bulkInsert('events', seedsData, {});

      await queryInterface.bulkInsert('seasons', seasonsSeed, {});
      const seasons = await queryInterface.sequelize.query(
        'SELECT id FROM "seasons";',
        options,
      );

      const gameweeksMapSeeds = gameweeksSeed.map((week) => ({
        ...week,
        season_id: seasons[randomIndex(seasons.length)].id,
      }));

      await queryInterface.bulkInsert('gameweeks', gameweeksMapSeeds);
      const gameweeks = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweeks";',
        options,
      );

      const leaguesMappedSeeds = leaguesSeed.map((league) => ({
        ...league,
        start_from: gameweeks[0].id,
      }));
      await queryInterface.bulkInsert('leagues', leaguesMappedSeeds, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.bulkDelete('fixtures_subscriptions', null, {});
      await queryInterface.bulkDelete('events', null, {});
      await queryInterface.bulkDelete('football_clubs', null, {});
      await queryInterface.bulkDelete('games', null, {});
      await queryInterface.bulkDelete('gameweek_histories', null, {});
      await queryInterface.bulkDelete('gameweeks', null, {});
      await queryInterface.bulkDelete('league_participants', null, {});
      await queryInterface.bulkDelete('leagues', null, {});
      await queryInterface.bulkDelete('player_match_stats', null, {});
      await queryInterface.bulkDelete('player_stats', null, {});
      await queryInterface.bulkDelete('seasons', null, {});
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('team_member_histories', null, {});
      await queryInterface.bulkDelete('images', null, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },
};
