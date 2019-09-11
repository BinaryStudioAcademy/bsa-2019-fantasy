const request = require('supertest');
const expect = require('chai').expect;
const playersPayload = require('./data/players.payload');
const data = require('./data/players.scenarios.json');
const Help = require('../../helpers/helpers');
const playersModels = require('./data/players.schema');
const args = require('../../specs/testData.json');
const playerIds = require('../utils/get-players.js');
const playerClubIds = require('../utils/get-playerClubID.js');

const appUrl = args.appUrl;
const URL = 'https://fantasy-football.tk/api/';

describe('Players services test suite', () => {
  let payload, path, token, actualProperties;

  beforeEach(() => {
    payload = {
      email: args.email,
      password: args.password,
    };
    return request(URL)
      .post('auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        token = response.body.token;
      })
      .catch((e) => console.error(e));
  });

  data.getPlayersScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      let queryString = '';
      Object.keys(scenario.query_params[0]).forEach((key) => {
        queryString += `${key}=${scenario.query_params[0][key]}&`;
      });

      path = `players${queryString}`;
      actualProperties = playersModels.playersSchema;
      return (
        request(URL)
          .get(path)
          .set('Authorization', `Bearer ${token}`)
          //.set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            const amount = response.body.count;
            for (let i = 0; i < amount; i++) {
              actualProperties.forEach((prop) => {
                expect(response.body.rows[i]).to.have.property(prop);
              });
            }
          })
      );
    });
  });

  it('should get random squad', () => {
    path = 'players/random-squad';
    actualProperties = playersModels.playersSchema;
    return (
      request(URL)
        .get(path)
        .set('Authorization', `Bearer ${token}`)
        //.set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        //.expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const amount = 15;
          for (let i = 0; i < amount; i++) {
            actualProperties.forEach((prop) => {
              expect(response.body[i]).to.have.property(prop);
            });
          }
        })
    );
  });

  data.getPlayerByIdScenarios.forEach((scenario) => {
    it(scenario.testCaseName,  async () => {
      const playerId = await playerIds.playersID(`${appUrl}api`, token);
      path = `players/${playerId[0]}`;
      actualProperties = playersModels.playersSchema;
      return (
        request(URL)
          .get(path)
          .set('Authorization', `Bearer ${token}`)
          //.set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            actualProperties.forEach((prop) => {
              expect(response.body).to.have.property(prop);
            });
          })
      );
    });
  });

  data.getFixturesForPlayer.forEach((scenario) => {
    it(scenario.testCaseName, async () => {
      const playerId = await playerIds.playersID(`${appUrl}api`, token);
      const playerClubID = await playerClubIds.playersClubID(`${appUrl}api`, token);
      actualProperties = playersModels.playerFixtures;
      path = `games/player/${playerId[0]}/${playerClubID[0]}`;
      return (
        request(URL)
          .get(path)
          .set('Authorization', `Bearer ${token}`)
          //.set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            actualProperties.forEach((prop) => {
              for (let i = 0; i < response.body.length; i++)
                expect(response.body[i]).to.have.property(prop);
            });
          })
      );
    });
  });

  data.getPlayerNextFixtureScenarios.forEach((scenario) => {
    it(scenario.testCaseName, async () => {
      actualProperties = playersModels.nextFixtureSchema;
      const playerId = await playerIds.playersID(`${appUrl}api`, token);
      path = `player-match-stats/next-fixture/${playerId[0]}`;
      return (
        request(URL)
          .get(path)
          .set('Authorization', `Bearer ${token}`)
          //.set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            actualProperties.forEach((prop) => {
              expect(response.body).to.have.property(prop);
            });
          })
      );
    });
  });

  data.getPlayerStatsScenarios.forEach((scenario) => {
    it(scenario.testCaseName, async () => {
      actualProperties = playersModels.playerStatsSchema;
      const playerId = await playerIds.playersID(`${appUrl}api`, token);
      path = `player-match-stats/by-gameweeks/${playerId[0]}`;
      return (
        request(URL)
          .get(path)
          .set('Authorization', `Bearer ${token}`)
          //.set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            actualProperties.forEach((prop) => {
              for (let i = 0; i < response.body.length; i++)
                expect(response.body[i]).to.have.property(prop);
            });
          })
      );
    });
  });
});
