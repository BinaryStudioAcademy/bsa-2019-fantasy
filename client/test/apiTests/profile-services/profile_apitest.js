const request = require('supertest');
const expect = require('chai').expect;
const profilePayload = require('./data/profile.payload');
const profileModels = require('./data/profile.schema');
const data = require('./data/profile.scenarios.json');
const args = require('../../specs/testData.json');
const gwIDs = require('../utils/get-gameweeksID');
const gameIds = require('../utils/get-gamesID.js');
const playerIds = require('../utils/get-players');

const appUrl = args.appUrl;
const URL = 'https://fantasy-football.tk/api/profile/';

describe('Profile services test suite', () => {
  let payload, token, userId, path, actualProperties;

  beforeEach(() => {
    payload = {
      email: args.email,
      password: args.password,
    };
    return request(appUrl + 'api/')
      .post('auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        userId = response.body.user.id;
        token = response.body.token;
      })
      .catch((e) => {
        throw new Error(e);
      });
  });

  //Update team details
  data.updateTeamDetailsScenarios.forEach((scenario) => {
    it(scenario.testCaseName, async () => {
      const playerID = await playerIds.playersID(`${appUrl}api`, token);
      let teamMemberData = [];
      for(let i = 0; i < 15; i++){
        teamMemberData[i] = {
          player_id: playerID[i],
          is_on_bench: scenario.teamMemberData[i].is_on_bench,
          is_captain: scenario.teamMemberData[i].is_captain,
          is_vice_captain: scenario.teamMemberData[i].is_vice_captain
        }
      }
      payload = Object.assign(
        {},
        profilePayload.updateUserTeamDetailsPayload(
          userId,
          scenario.userData,
          teamMemberData,
        ),
      );
      const gameweekIds = await gwIDs.gameweeksID(`${appUrl}api`, token);

      path = `${userId}/${gameweekIds[4]}`;
      return request(URL)
        .put(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect(200)
        .then((response) => {
          expect(response.body.message).to.be.equal(scenario.message);
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  });

  //Update fav club
  data.updateUserFavClubScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      const rndClubId = Math.floor(Math.random() * 19) + 1;
      payload = Object.assign(
        {},
        profilePayload.updateUserFavoriteClubPayload(rndClubId),
      );
      path = 'favorite-club';

      return request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.message).to.be.equal(scenario.message);
        });
    });
  });

  //Update send mail time
  data.updateUserSendMailTime.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      path = `${userId}`;
      payload = Object.assign(
        {},
        profilePayload.updateUserSendMailTimePayload(scenario.sendmail_time),
      );

      return request(URL)
        .put(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect(200)
        .then((response) => {
          expect(response.body.message).to.be.equal(scenario.message);
        });
    });
  });

  //GET Subscribed Fixtures
  data.getUserSubscribedFixturesScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      actualProperties = profileModels.subscrFixtures;
      path = `fixtures-sub/${userId}`;

      return request(URL)
        .get(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(scenario.status)
        .then((response) => {
          actualProperties.forEach((prop) => {
            expect(response.body[0]).to.have.property(prop);
          });
        });
    });
  });

  //POST
  data.updateUserFixtureSubscrScenarios.forEach((scenario) => {
    it(scenario.testCaseName, async () => {
      const game_id = await gameIds.gamesID(`${appUrl}api`, token, 6);
      path = 'fixtures-sub';
      payload = Object.assign(
        {},
        profilePayload.updateUserFixtureSubscriptionPayload(userId, game_id[0]),
      );
      return request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect(200)
        .then((response) => {
          expect(response.body.message.trim()).to.be.equal(scenario.message);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
  });

  //DELETE
  data.deleteUserFixtureSubscrScenarios.forEach((scenario) => {
    it(scenario.testCaseName, async () => {
      const game_id = await gameIds.gamesID(`${appUrl}api`, token, 6);
      path = 'fixtures-sub';
      payload = Object.assign(
        {},
        profilePayload.deleteUserFixtureSubscrPayload(userId, game_id[0]),
      );
      return request(URL)
        .delete(path)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(200)
        .then((response) => {
          expect(response.body.message).to.be.equal(scenario.message);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
  });
});
