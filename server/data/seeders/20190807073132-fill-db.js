import usersSeed from '../seed-data/users.seed';
import playersSeed from '../seed-data/player-stats.seed';
import footballClubsSeed from '../seed-data/football-clubs.seed';
import playerMatchSeed from '../seed-data/player-match-stats.seed';
import eventsSeed from '../seed-data/events.seed';
import gamesSeed from '../seed-data/games.seed';
import gameweeksSeed from '../seed-data/gameweeks.seed';
import gameweekHistoriesSeed from '../seed-data/gameweek-histories.seed';
import leaguesSeed from '../seed-data/leagues.seed';
import leagueParticipantsSeed from '../seed-data/league-participants.seed';
import seasonsSeed from '../seed-data/seasons.seed';
import teamMemberHistoriesSeed from '../seed-data/team-member-histories.seed';

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
      const footballClubs = await queryInterface.sequelize.query(
        'SELECT id FROM "football_clubs";',
        options,
      );

      seedsData = await playersSeed;
      await queryInterface.bulkInsert('player_stats', seedsData, {});
      const playerStats = await queryInterface.sequelize.query(
        'SELECT id FROM "player_stats";',
        options,
      );

      seedsData = await gamesSeed;
      await queryInterface.bulkInsert('games', seedsData, {});
      const games = await queryInterface.sequelize.query(
        'SELECT id FROM "games" WHERE finished;',
        options,
      );

      const playerMatchMappedSeed = playerMatchSeed.map((match) => ({
        ...match,
        player_id: playerStats[randomIndex(playerStats.length)].id,
      }));

      await queryInterface.bulkInsert('player_match_stats', playerMatchMappedSeed, {});
      const playerMatchStats = await queryInterface.sequelize.query(
        'SELECT id FROM "player_match_stats";',
        options,
      );

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

      const eventMappedSeeds = eventsSeed.map((event) => ({
        ...event,
        player_match_stat_id: playerMatchStats[randomIndex(playerMatchStats.length)].id,
        game_id: games[randomIndex(games.length)].id,
      }));

      await queryInterface.bulkInsert('events', eventMappedSeeds, {});

      const usersMappedSeeds = usersSeed.map((user) => ({
        ...user,
        favorite_club_id: footballClubs[randomIndex(footballClubs.length)].id,
      }));

      await queryInterface.bulkInsert('users', usersMappedSeeds, {});
      const users = await queryInterface.sequelize.query(
        'SELECT id FROM "users";',
        options,
      );
      const gameweekHistoryMappedSeeds = gameweekHistoriesSeed.map((history, index) => {
        return {
          ...history,
          gameweek_id: gameweeks[index].id,
          user_id: users[0].id,
        };
      });

      await queryInterface.bulkInsert(
        'gameweek_histories',
        gameweekHistoryMappedSeeds,
        {},
      );
      const gameweekHistories = await queryInterface.sequelize.query(
        'SELECT id FROM "gameweek_histories";',
        options,
      );

      const teamMemberHistoriesMappedSeeds = teamMemberHistoriesSeed.map(
        (member, index) => {
          let gameweek_history_id = '';
          if (index <= 14) {
            gameweek_history_id = gameweekHistories[0].id;
          } else {
            gameweek_history_id = gameweekHistories[1].id;
          }
          return {
            ...member,
            player_id: playerStats[randomIndex(playerStats.length)].id,
            gameweek_history_id,
          };
        },
      );

      await queryInterface.bulkInsert(
        'team_member_histories',
        teamMemberHistoriesMappedSeeds,
        {},
      );

      const leaguesMappedSeeds = leaguesSeed.map((league) => ({
        ...league,
        start_from: gameweeks[0].id,
      }));
      await queryInterface.bulkInsert('leagues', leaguesMappedSeeds, {});
      const leagues = await queryInterface.sequelize.query(
        'SELECT id FROM "leagues";',
        options,
      );

      const leagueParticipantMappedSeeds = leagueParticipantsSeed.map((participant) => ({
        ...participant,
        participant_id: users[randomIndex(users.length)].id,
        league_id: leagues[randomIndex(leagues.length)].id,
      }));
      await queryInterface.bulkInsert(
        'league_participants',
        leagueParticipantMappedSeeds,
        {},
      );
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async (queryInterface) => {
    try {
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
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },
};
