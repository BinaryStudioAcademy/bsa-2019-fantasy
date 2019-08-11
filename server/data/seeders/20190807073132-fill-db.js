import usersSeed from "../seed-data/users.seed";
import playersSeed from "../seed-data/player-stats.seed";
import footballClubsSeed from "../seed-data/football-clubs.seed";
import playerMatchSeed from "../seed-data/player-match-stats.seed";
import eventsSeed from "../seed-data/events.seed";
import gamesSeed from "../seed-data/games.seed";
import gameweeksSeed from "../seed-data/gameweeks.seed";
import gameweekHistoriesSeed from "../seed-data/gameweek-histories.seed";
import leaguesSeed from "../seed-data/leagues.seed";
import leagueParticipantsSeed from "../seed-data/league-participants.seed";
import seasonsSeed from "../seed-data/seasons.seed";

const randomIndex = length => Math.floor(Math.random() * length);

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      let seedsData;
      const options = {
        type: Sequelize.QueryTypes.SELECT
      };

      seedsData = await footballClubsSeed;
      await queryInterface.bulkInsert("football_clubs", seedsData, {});
      const footballClubs = await queryInterface.sequelize.query(
        'SELECT id FROM "football_clubs";',
        options
      );

      seedsData = await playersSeed;
      await queryInterface.bulkInsert("player_stats", seedsData, {});
      const playerStats = await queryInterface.sequelize.query(
        'SELECT id FROM "player_stats";',
        options
      );

      await queryInterface.bulkInsert(
        "player_match_stats",
        playerMatchSeed,
        {}
      );
      const playerMatchStats = await queryInterface.sequelize.query(
        'SELECT id FROM "player_match_stats";',
        options
      );

      const eventMappedSeeds = eventsSeed.map((event, i) => ({
        ...event,
        player_id: playerMatchStats[randomIndex(playerMatchStats.length)].id
      }));

      await queryInterface.bulkInsert("gameweeks", gameweeksSeed);
      const gameweeks = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweeks";',
        options
      );

      await queryInterface.bulkInsert("events", eventMappedSeeds, {});
      const events = await queryInterface.sequelize.query(
        'SELECT id FROM "events";',
        options
      );

      const gameMappedSeeds = gamesSeed.map((game, i) => ({
        ...game,
        hometeam_id: footballClubs[randomIndex(footballClubs.length)].id,
        awayteam_id: footballClubs[randomIndex(footballClubs.length)].id,
        game_event_id: events[randomIndex(events.length)].id,
        gameweek_id: gameweeks[randomIndex(gameweeks.length)].id
      }));

      await queryInterface.bulkInsert("games", gameMappedSeeds, {});

      const gameweekHistoryMappedSeeds = gameweekHistoriesSeed.map(history => ({
        ...history,
        gameweek_active_id: gameweeks[randomIndex(gameweeks.length)].id,
        team_player_id: playerStats[randomIndex(playerStats.length)].id,
        team_captain_id: playerStats[randomIndex(playerStats.length)].id
      }));

      await queryInterface.bulkInsert(
        "gameweek_histories",
        gameweekHistoryMappedSeeds,
        {}
      );
      const gameweekHistories = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweek_histories";',
        options
      );

      const usersMappedSeeds = usersSeed.map(user => ({
        ...user,
        game_week_history_id:
          gameweekHistories[randomIndex(gameweekHistories.length)].id,
        favorite_club_id: footballClubs[randomIndex(footballClubs.length)].id
      }));

      await queryInterface.bulkInsert("users", usersMappedSeeds, {});

      const users = await queryInterface.sequelize.query(
        'SELECT id FROM "users";',
        options
      );

      const leagueMappedSeeds = leaguesSeed.map(league => ({
        ...league,
        creator_id: users[randomIndex(users.length)].id
      }));

      await queryInterface.bulkInsert("leagues", leagueMappedSeeds, {});
      const leagues = await queryInterface.sequelize.query(
        'SELECT id FROM "leagues";',
        options
      );

      const leagueParticipantMappedSeeds = leagueParticipantsSeed.map(
        participant => ({
          ...participant,
          participant_id: users[randomIndex(users.length)].id,
          league_id: leagues[randomIndex(leagues.length)].id
        })
      );
      await queryInterface.bulkInsert(
        "league_participants",
        leagueParticipantMappedSeeds,
        {}
      );

      const seasonMappedSeeds = seasonsSeed.map(season => ({
        ...season,
        gameweek_id: gameweeks[randomIndex(gameweeks.length)].id
      }));

      await queryInterface.bulkInsert("seasons", seasonMappedSeeds, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("events", null, {});
      await queryInterface.bulkDelete("football_clubs", null, {});
      await queryInterface.bulkDelete("games", null, {});
      await queryInterface.bulkDelete("gameweek_histories", null, {});
      await queryInterface.bulkDelete("gameweeks", null, {});
      await queryInterface.bulkDelete("league_participants", null, {});
      await queryInterface.bulkDelete("leagues", null, {});
      await queryInterface.bulkDelete("player_match_stats", null, {});
      await queryInterface.bulkDelete("player_stats", null, {});
      await queryInterface.bulkDelete("seasons", null, {});
      await queryInterface.bulkDelete("users", null, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  }
};
