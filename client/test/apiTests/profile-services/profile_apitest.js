const request = require('supertest');
const expect = require('chai').expect;
const profilePayload = require('./data/profile.payload');
const profileModels = require('./data/profile.schema');
const data = require('./data/profile.scenarios.json');
const args = require('../../specs/testData.json');

const appUrl = args.appUrl;
const URL = 'https://fantasy-football.tk/api/profile/';

describe('Profile services test suite', () => {
  let payload;
  let token;
  let userId;
  let path;
  let actualProperties;

  beforeEach(async () => {
    payload = {
        email: args.email,
        password: args.password
    };
    return await request(appUrl + 'api/')
    .post('auth/login')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(payload)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(async (response) => {
        userId = await response.body.user.id;
        token = await response.body.token;
    })
    .catch(e => console.error(e));
  });

  //Update team details
  data.updateTeamDetailsScenarios.forEach((scenario) => {

    it(scenario.testCaseName, async () => {
      payload = Object.assign(
        {},
        profilePayload.updateUserTeamDetailsPayload(
          userId,
          scenario.userData,
          scenario.teamMemberData,
        ),
      );
      const rndGameweek = Math.floor(Math.random()*37) + 1;
      path = `${userId}/${rndGameweek}`;
      return await request(URL)
        .put(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        //.expect('Content-Type', /json/)
        .expect(200)
        .then(async (response) => {
          const res = response.body;
          const actualMessage = res.message;
          expect(actualMessage).to.be.equal(scenario.message);
        })
        .catch(e => {
           throw new Error(e);
        });
    });
  });

  //Update fav club
  data.updateUserFavClubScenarios.forEach((scenario) => {

    it(scenario.testCaseName, async () => {
      const rndClubId = Math.floor(Math.random()*19) + 1;
      payload = Object.assign(
        {},
        profilePayload.updateUserFavoriteClubPayload(
          rndClubId
        )
      );
      path = 'favorite-club';

      return await request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (response) => {      
          const res = response.body;
          const actualMessage = res.message;
          expect(actualMessage).to.be.equal(scenario.message);
        });
    });
  });

  //Update send mail time
  data.updateUserSendMailTime.forEach((scenario) => {

    it(scenario.testCaseName, async () => {
      path = `${userId}`
      payload = Object.assign(
        {},
        profilePayload.updateUserSendMailTimePayload(
          scenario.sendmail_time
        )
      );

      return await request(URL)
        .put(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        //.expect('Content-Type', /json/)
        .expect(200)
        .then(async (res) => {
          const response = await res.body;
          const actualMessage = await response.message;
          expect(actualMessage).to.be.equal(scenario.message);
        });
    })
  });

  //GET Subscribed Fixtures
  data.getUserSubscribedFixturesScenarios.forEach((scenario) => {

    it(scenario.testCaseName, async () => {
      actualProperties = profileModels.subscrFixtures;
      path = `fixtures-sub/${userId}`

      return await request(URL)
        .get(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(scenario.status)
        .then(async (response) => {
          const res = await response.body;
          actualProperties.forEach(prop => {
            expect(res[0]).to.have.property(prop);
          });
        });
    });
  });

  //POST
  data.updateUserFixtureSubscrScenarios.forEach((scenario) => {

    it(scenario.testCaseName, async () =>{
      path = 'fixtures-sub'
      payload = Object.assign(
        {},
        profilePayload.updateUserFixtureSubscriptionPayload(
          scenario.game_id,
          userId
        )
      );
      return await request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (response) => {
          const res = await response.body;
          const actualMessage = res.message;
          expect(actualMessage).to.be.equal(scenario.message);
        })
        .catch(e => {
          throw new Error(e);
       });
    });
  });

  //DELETE
  data.deleteUserFixtureSubscrScenarios.forEach((scenario) => {
    it(scenario.testCaseName, async () =>{
      path = 'fixtures-sub';
      payload = Object.assign(
        {},
        profilePayload.deleteUserFixtureSubscrPayload(
          scenario.game_id,
          userId
        )
      );
      return await request(URL)
        .delete(path)
        .set('Authorization', `Bearer ${token}`)
        //.expect('Content-Type', /json/)
        .expect(200)
        .then(async (response) => {
          const res = response.body;
          const actualMessage = res.message;
          expect(actualMessage).to.be.equal(scenario.message);
        });
    });
  });

});
