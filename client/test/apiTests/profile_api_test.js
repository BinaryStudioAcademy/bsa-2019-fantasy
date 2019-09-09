const request = require('supertest');
const expect = require('chai').expect;
const profilePayload = require('./data/profile.payload');
const profileModels = require('./data/profile.schema');
const data = require('./data/profile.scenarios.json');
const args = require('../specs/testData.json');

const appUrl = args.appUrl;
const URL = 'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/api/profile';

describe('Profile services test suite', () => {
  let payload;
  let token;
  let userId;
  let path;
  let actualProperties;

  beforeEach(async (token, userId) => {
    path = 'auth/login'
    response = await fetch(`${appUrl}/${path}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: args.email,
          password: args.password
      })
    })
    .then(res => {
      return res.json()
    });
    token = response.token;
    userId = response.user.id;
  }, token, userId);

  //Update team details
  data.updateTeamDetailsScenarios.forEach((scenario) => {
    payload = Object.assign(
      {},
      profilePayload.updateUserTeamDetailsPayload(
        scenario.userData,
        scenario.teamMemberData,
      ),
    );
    it(scenario.testCaseName, () => {
      rndGameweek = Math.floor(Math.random()*37) + 1;
      path = `/${userId}/${rndGameweek}`
      return request(URL)
        .put(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.message).to.be.equal(scenario.message);
        })
        .catch(e => {
           throw new Error(e);
        });
    });
  });

  //Update fav club
  data.updateUserFavClubScenarios.forEach((scenario) => {
    const rndClubId = Math.floor(Math.random()*19) + 1;
    payload = Object.assign(
      {},
      profilePayload.updateUserFavoriteClubPayload(
        rndClubId
      )
    );
    it(scenario.testCaseName, () => {
      path = '/favorite-club'
      return request(URL)
        .post(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.message).to.be.equal(scenario.message);
        });
    });
  });

  //Update send mail time
  data.updateUserSendMailTimePayload.forEach((scenario) => {
    path = `${userId}`
    payload = Object.assign(
      {},
      profilePayload.updateUserSendMailTimePayload(
        scenario.sendmail_time
      )
    );

    it(scenario.testCaseName, () => {
      return request(URL)
        .put(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(response.message).to.be.equal(scenario.message);
        });
    })
  });

  //GET Subscribed Fixtures
  data.getUserSubscribedFixturesScenarios.forEach((scenario) => {
    actualProperties = profileModels.subscrFixtures;
    path = `/fixtures-sub/${userId}`
    it(scenario.testCaseName, () => {
      return request(URL)
        .get(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          actualProperties.forEach(prop => {
            expect(response).to.have.property(prop);
          });
        });
    });
  });

  //POST
  data.updateUserFixtureSubscrScenarios.forEach((scenario) => {
    path = '/fixtures-sub'
    payload = Object.assign(
      {},
      profilePayload.updateUserFixtureSubscriptionPayload(
        scenario.game_id
      )
    );

    it(scenario.testCaseName, () =>{
      return request(URL)
        .post(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.message).to.be.equal(scenario.message);
        });
    });
  });

  //DELETE
  data.deleteUserFixtureSubscrScenarios.forEach((scenario) => {
    path = '/fixtures-sub'
    it(scenario.testCaseName, () =>{
      return request(URL)
        .delete(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.message).to.be.equal(scenario.message);
        });
    });
  });

});
